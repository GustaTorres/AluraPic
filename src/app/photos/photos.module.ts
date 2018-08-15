import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './photo/photo.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [PhotoComponent],
    exports: [PhotoComponent],
    imports: [HttpClientModule]
})
export class PhotosModule {

}