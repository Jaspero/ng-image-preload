import {Component} from '@angular/core';
import {JpPreloadService} from '@jaspero/ng-image-preload';

@Component({
  selector: 'jp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private jpPreloadService: JpPreloadService) {
    this.jpPreloadService.initialize();
  }
}
