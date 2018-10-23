import { PhotoModule } from './../photo/photo.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from './../../shared/components/vmessage/vmessage.module';
import { PhotoFormComponent } from './photo-form.component';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';

@NgModule({
    declarations: [
        PhotoFormComponent
    ],imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        VmessageModule,
        PhotoModule,
        ImmediateClickModule
    ]
})
export class PhotoFormModule {

}