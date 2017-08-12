import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {PreloadService} from './preload.service';

@Directive({
  selector: '[jaspero-preload]'
})
export class PreloadDirective {
  constructor(
    private _el: ElementRef,
    private _renderer: Renderer2,
    private _service: PreloadService
  ) {}

  @Input() loadBg = false;
  @Input('jaspero-preload') set preload(img: string) {
    this._renderer.setAttribute(this._el.nativeElement, this.loadBg ? 'data-bg' : 'data-src', img);
    this._service.addImage(this._el.nativeElement);
  }
}
