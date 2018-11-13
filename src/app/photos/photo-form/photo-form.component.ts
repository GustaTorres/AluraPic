import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
import { Router } from '@angular/router';
import { PhotoService } from './../photo/photo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  public photoForm: FormGroup;
  public file: File;
  public preview: string;

  constructor(
      private formBuilder: FormBuilder,
      private photoService: PhotoService,
      private router: Router,
      private alertService: AlertService,
      private userService: UserService
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['',Validators.required],
      description: ['',Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  public upload(): void {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    
    this.photoService
      .upload(description,allowComments,this.file)
      .subscribe(() => {
        this.alertService.success('Photo uploaded successfully!',true);
        this.router.navigate(['/user',this.userService.getUserName()]);
      },err => {
        console.log(err);
        this.alertService.warning('Could not upload the photo!');
      });
  }

  public handleFile(file: File): void {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
