import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadDirective} from './preload.directive';
import {JpPreloadService} from './preload.service';

@NgModule({
  imports: [CommonModule],
  declarations: [PreloadDirective],
  exports: [PreloadDirective]
})
export class JpImagePreloadModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: JpImagePreloadModule,
      providers: [JpPreloadService]
    };
  }
}
