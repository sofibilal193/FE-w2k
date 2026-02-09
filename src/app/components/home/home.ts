import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

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
  ]);
}
