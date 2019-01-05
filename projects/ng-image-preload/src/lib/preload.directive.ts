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

  @Input()
  fallback: string;

  @Input('jpPreload')
  set preload(src: string) {
    this.service.addImage(this.el.nativeElement, {
      src,
      background: this.el.nativeElement.nodeName === 'IMG',
      fallback: this.fallback
    });
  }
}
