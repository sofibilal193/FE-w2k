import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-footer',
    role: 'contentinfo',
  },
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
  companyName = signal('Way to Kashmir');
  
  footerLinks = signal([
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ]);
}
