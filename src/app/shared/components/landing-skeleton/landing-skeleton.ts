import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-skeleton',
  imports: [],
  templateUrl: './landing-skeleton.html',
  styleUrl: './landing-skeleton.scss',
})
export class LandingSkeleton {
  protected readonly teamRows   = [1, 2, 3, 4, 5, 6, 7];
  protected readonly featRows   = [1, 2, 3, 4, 5, 6];
  protected readonly stripItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected readonly termWidths = ['68%', '42%', '85%', '55%', '72%', '38%'];
}
