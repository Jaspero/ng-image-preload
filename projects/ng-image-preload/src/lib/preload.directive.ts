import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import {JpPreloadService} from './preload.service';

@Directive({
  selector: '[jpPreload]'
})
export class PreloadDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private service: JpPreloadService
  ) {}

  @Input('jpPreload')
  set preload(img: string) {
    this.renderer.setAttribute(
      this.el.nativeElement,
      this.el.nativeElement.nodeName === 'IMG' ? 'data-src' : 'data-bg',
      img
    );
    this.service.addImage(this.el.nativeElement);
  }
}
