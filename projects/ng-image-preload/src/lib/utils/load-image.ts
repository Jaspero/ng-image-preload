import {Observable} from 'rxjs';

export function loadImage(src: string): Observable<boolean> {
  return Observable.create(obs => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      obs.next(true);
      obs.complete();
    };
    image.onerror = err => {
      obs.error(err);
      obs.complete();
    };
  });
}
