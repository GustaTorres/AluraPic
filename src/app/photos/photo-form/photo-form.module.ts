import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImmediateClickModule } from '../../shared/directives/immediate-click/immediate-click.module';
import { VmessageModule } from './../../shared/components/vmessage/vmessage.module';
import { PhotoModule } from './../photo/photo.module';
import { PhotoFormComponent } from './photo-form.component';

@NgModule({
  declarations: [
    PhotoFormComponent
  ], imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    VmessageModule,
    PhotoModule,
    ImmediateClickModule,
    RouterModule
  ]
})
export class PhotoFormModule {

}