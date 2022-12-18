import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimationX, slideInAnimationY } from './animations/slideAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimationX, slideInAnimationY],
})
export class AppComponent {
  title = 'ShopManager';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationDataX(): number {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']?.x;
  }

  getRouteAnimationDataY(): number {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']?.y;
  }
}
