import {Injectable} from '@angular/core';

@Injectable()
export class JpPreloadService {
  static get INTERSECTION_OBSERVER_SUPPORT() {
    return 'IntersectionObserver' in window;
  }

  observer: IntersectionObserver;
  onAdd: Function = this.addImageFallbackToSet;
  elements: HTMLElement[] = [];
  defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.01
  };

  initialize(options: IntersectionObserverInit = {}) {
    if (JpPreloadService.INTERSECTION_OBSERVER_SUPPORT) {
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
      this.initLoad(entry.target);
    });
  }

  addImage(element: HTMLElement) {
    this.onAdd(element);
  }

  addImageToSet(element: HTMLElement) {
    element.dataset.secretId = new Date().getTime().toString();
    this.observer.observe(element);
    this.elements.push(element);
  }

  addImageFallbackToSet(element: HTMLElement) {
    this.initLoad(element);
  }

  initLoad(element: HTMLElement) {
    const src = element.dataset.src || element.dataset.bg;

    if (!src) {
      return;
    }

    return this.load(src)
      .then(_ => this.finalize(element))
      .catch(err => {
        // TODO: Do something
        console.log(err);
      });
  }

  load(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }

  finalize(element) {
    const index = this.elements.findIndex(
      el => el.dataset.secretId === element.dataset.secretId
    );

    element.classList.add('loaded');

    if (element.dataset.src) {
      element.src = element.dataset.src;
    } else {
      element.styles['background-image'] = `url(${element.dataset.bg})`;
    }

    if (index === -1) {
      return;
    }

    this.elements.splice(index, 1);
  }
}
