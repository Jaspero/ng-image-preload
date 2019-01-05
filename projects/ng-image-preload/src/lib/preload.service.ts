import {Injectable} from '@angular/core';
import {addImage} from './interfaces/add-image.type';
import {ElementConfig} from './interfaces/element-config.interface';
import {loadImage} from './utils/load-image';

@Injectable()
export class JpPreloadService {
  observer: IntersectionObserver;
  onAdd: addImage = this.addImageFallbackToSet;
  tracked: Map<HTMLElement, ElementConfig>;
  defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  initialize(options: IntersectionObserverInit = {}) {
    this.tracked = new Map();

    if ('IntersectionObserver' in window) {
      options = {
        ...this.defaultOptions,
        ...options
      };

      this.onAdd = this.addImageToSet;
      this.observer = new IntersectionObserver(
        entries => this.onIntersection(entries),
        options
      );
    } else {
      this.onAdd = this.addImageFallbackToSet;
    }
  }

  onIntersection(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) {
        return;
      }

      this.observer.unobserve(entry.target);
      this.load(entry.target);
    });
  }

  addImage(element: HTMLElement, config: ElementConfig) {
    this.onAdd(element, config);
  }

  load(element: HTMLElement, elemConfig?: ElementConfig) {
    elemConfig = elemConfig || this.tracked.get(element);

    if (!elemConfig) {
      return;
    }

    loadImage(elemConfig.src).subscribe(
      () => {
        element.classList.add('loaded');

        if (elemConfig.background) {
          element.style['backgroun-image'] = `url(${elemConfig.src})`;
        } else {
          (element as HTMLImageElement).src = elemConfig.src;
        }

        if (this.tracked && this.tracked.has(element)) {
          this.tracked.delete(element);
        }
      },
      () => {
        if (elemConfig.fallback) {
          if (elemConfig.background) {
            element.style['backgroun-image'] = `url(${elemConfig.fallback})`;
          } else {
            (element as HTMLImageElement).src = elemConfig.fallback;
          }
        }
      }
    );
  }

  private addImageToSet(element: HTMLElement, config: ElementConfig) {
    this.observer.observe(element);
    this.tracked.set(element, config);
  }

  private addImageFallbackToSet(element: HTMLElement, config: ElementConfig) {
    this.load(element, config);
  }
}
