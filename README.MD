[![Build Status](https://travis-ci.org/Jaspero/ng-color-picker.svg?branch=master)](https://travis-ci.org/jaspero/ng-image-preloader)
[![NPM Version](https://img.shields.io/npm/v/@jaspero/ng-image-preloader.svg)](https://www.npmjs.com/package/@jaspero/ng-image-preloader)

# NG Image Preload
An image preload module for Angular using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) in favour of scroll listener's.

```
npm install --save @jaspero/ng-image-preloader
```

## Setup
Import `JasperoImagePreloaderModule` in your `@NgModule`:

```ts
@NgModule({
    imports: [
        JasperoImagePreloaderModule.forRoot();
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

Then in your component initialize the service:

```ts
class AppComponent implements OnInit {
    constructor(
        private _preload: PreloadService
    ) {}

    ngOnInit() {
        this._preload.initialize();
    }
}
```

The `initialize` method accepts an optional `options` object:

### Options
|Name|Type|Default|
|---|---|---|---|
|rootMargin|string|0 50px|
|threshold|number|0.1|

A description for this options can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

## How To Use
There are two ways to consume the library. Using the service or the directive.

### Service
Inject the `PreloadService` in to a component.


```ts

    constructor(
        private _preload: PreloadService
    ) {}

    // Then add an image element to the que like this:
    addImage(element: HTMLElement) {
        this._preload.addImage(element);
    }
```

### Directive
You can add the `jaspero-preload` directive to an `img` element like this:

```html
    <img src="initialImage.jpg" jaspero-preload="someImage.jpg"></img>
```

The `initialImage.jpg` will not be preloaded, this is usually a spinner or some other light image.
The `someImage.jpg` image will be shown when the element is in view.

If you need to preload a background image the `jaspero-preload` directive can be placed on any html element like this:

```html
    <div class="some-element" [loadBg]="true" jaspero-preload="someImage.jpg"></div>
```

To show an image initially you can add a css background-image to the class. This image will then be replaced when the element is in view.
