import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadDirective} from './preload.directive';
import {PreloadService} from './preload.service';

export * from './preload.service';
export * from './preload.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PreloadDirective
    ],
    exports: [
        PreloadDirective
    ]
})
export class JasperoImagePreloadModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: JasperoImagePreloadModule,
            providers: [PreloadService]
        };
    }
}
