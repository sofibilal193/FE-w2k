import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  features = signal([
    {
      title: 'Stunning Landscapes',
      description: 'Explore breathtaking valleys, mountains, and pristine forests.',
      icon: '🏔️',
    },
    {
      title: 'Rich Culture',
      description: 'Experience vibrant traditions, local cuisine, and warm hospitality.',
      icon: '🎭',
    },
    {
      title: 'Adventure Activities',
      description: 'Trek, ski, camp, and explore nature at its finest.',
      icon: '⛰️',
    },
    {
      title: 'Perfect Climate',
      description: 'Visit during any season for unique and memorable experiences.',
      icon: '☀️',
    },

    /* 🔹 NEW CARDS */
    {
      title: 'Dal Lake Experience',
      description: 'Enjoy peaceful shikara rides and iconic houseboats.',
      icon: '🚣‍♂️',
    },
    {
      title: 'Snow Paradise',
      description: 'Witness magical snowfall and winter sports in Gulmarg.',
      icon: '❄️',
    },
    {
      title: 'Lush Meadows',
      description: 'Walk through green meadows of Pahalgam and Sonamarg.',
      icon: '🌿',
    },
    {
      title: 'Spiritual Heritage',
      description: 'Visit ancient shrines, mosques, and spiritual landmarks.',
      icon: '🕌',
    },
    {
      title: 'Local Handicrafts',
      description: 'Shop authentic pashmina, carpets, and wooden crafts.',
      icon: '🧵',
    },
    {
      title: 'Delicious Cuisine',
      description: 'Taste traditional Wazwan and Kashmiri delicacies.',
      icon: '🍲',
    },
  ]);
}
