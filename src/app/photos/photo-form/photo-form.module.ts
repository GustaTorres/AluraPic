import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from './../../shared/components/vmessage/vmessage.module';
import { PhotoFormComponent } from './photo-form.component';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        VmessageModule
    ]
})
export class PhotoFormModule {

}