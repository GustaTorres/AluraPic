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
      private router: Router
    ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['',Validators.required],
      description: ['',Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  public upload(): void {
    const description = this.photoForm.get('description').value
    const allowComments = this.photoForm.get('allowComments').value
    
    this.photoService
      .upload(description,allowComments,this.file)
      .subscribe(() => this.router.navigate(['']))

  }

  public handleFile(file: File): void {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
}
