import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  // =============================
  // PUBLIC ENCRYPT METHOD
  // =============================
  async encryptAsymmetric(plainText: string, publicKeyBase64: string): Promise<string | null> {

    if (!plainText || !publicKeyBase64) return null;

    try {
      // 1️⃣ Generate AES key
      const aesKey = await crypto.subtle.generateKey(
        {
          name: 'AES-CBC',
          length: 256
        },
        true,
        ['encrypt', 'decrypt']
      );

      // 2️⃣ Generate IV
      const iv = crypto.getRandomValues(new Uint8Array(16));

      // 3️⃣ Encrypt data with AES
      const encodedText = new TextEncoder().encode(plainText);

      const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv },
        aesKey,
        encodedText
      );

      // 4️⃣ Export AES key
      const rawAesKey = await crypto.subtle.exportKey('raw', aesKey);

      // 5️⃣ Import RSA Public Key
      const rsaPublicKey = await crypto.subtle.importKey(
        'spki',
        this.base64ToArrayBuffer(publicKeyBase64),
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256'
        },
        false,
        ['encrypt']
      );

      // 6️⃣ Encrypt AES key & IV with RSA
      const encryptedKey = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        rsaPublicKey,
        rawAesKey
      );

      const encryptedIv = await crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        rsaPublicKey,
        iv
      );

      // 7️⃣ Combine everything
      const finalBytes = this.combineBuffers(
        encryptedKey,
        encryptedIv,
        encryptedData
      );

      return this.arrayBufferToBase64(finalBytes);

    } catch (err) {
      console.error('Hybrid encryption error:', err);
      return null;
    }
  }


  // =============================
  // PUBLIC DECRYPT METHOD
  // =============================
  async decryptAsymmetric(
    cipherText: string,
    privateKeyBase64: string
  ): Promise<string | null> {

    if (!cipherText || !privateKeyBase64) return null;

    try {
      const allBytes = this.base64ToArrayBuffer(cipherText);
      const dataView = new DataView(allBytes);

      let offset = 0;

      // Read key length
      const keyLen = dataView.getInt32(offset, true);
      offset += 4;

      const encryptedKey = allBytes.slice(offset, offset + keyLen);
      offset += keyLen;

      // Read iv length
      const ivLen = dataView.getInt32(offset, true);
      offset += 4;

      const encryptedIv = allBytes.slice(offset, offset + ivLen);
      offset += ivLen;

      const encryptedData = allBytes.slice(offset);

      // Import private RSA key
      const rsaPrivateKey = await crypto.subtle.importKey(
        'pkcs8',
        this.base64ToArrayBuffer(privateKeyBase64),
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256'
        },
        false,
        ['decrypt']
      );

      // Decrypt AES key & IV
      const rawKey = await crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        rsaPrivateKey,
        encryptedKey
      );

      const iv = await crypto.subtle.decrypt(
        { name: 'RSA-OAEP' },
        rsaPrivateKey,
        encryptedIv
      );

      // Import AES key
      const aesKey = await crypto.subtle.importKey(
        'raw',
        rawKey,
        { name: 'AES-CBC' },
        false,
        ['decrypt']
      );

      // Decrypt data
      const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-CBC', iv: new Uint8Array(iv) },
        aesKey,
        encryptedData
      );

      return new TextDecoder().decode(decryptedData);

    } catch (err) {
      console.error('Hybrid decryption error:', err);
      return null;
    }
  }


  // =============================
  // HELPERS
  // =============================

  private combineBuffers(
    encryptedKey: ArrayBuffer,
    encryptedIv: ArrayBuffer,
    encryptedData: ArrayBuffer
  ): ArrayBuffer {

    const keyLen = new Uint32Array([encryptedKey.byteLength]);
    const ivLen = new Uint32Array([encryptedIv.byteLength]);

    const totalLength =
      4 + encryptedKey.byteLength +
      4 + encryptedIv.byteLength +
      encryptedData.byteLength;

    const combined = new Uint8Array(totalLength);
    let offset = 0;

    combined.set(new Uint8Array(keyLen.buffer), offset);
    offset += 4;

    combined.set(new Uint8Array(encryptedKey), offset);
    offset += encryptedKey.byteLength;

    combined.set(new Uint8Array(ivLen.buffer), offset);
    offset += 4;

    combined.set(new Uint8Array(encryptedIv), offset);
    offset += encryptedIv.byteLength;

    combined.set(new Uint8Array(encryptedData), offset);

    return combined.buffer;
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }
}
