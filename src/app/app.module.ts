import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {JpImagePreloadModule} from '@jaspero/ng-image-preload';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, JpImagePreloadModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
