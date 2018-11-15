import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PhotoService } from '../../photo/photo.service';
import { PhotoComment } from './../../photo/photo-comment';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input()
  public photoId: number;
  public comments$: Observable<PhotoComment[]>;
  public commentForm: FormGroup;

  @Output()
  public photoEvent: EventEmitter<Observable<Photo>> = new EventEmitter;

  constructor(
      private photoService: PhotoService,
      private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.comments$ = this.photoService.getComments(this.photoId);
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }
  
  public save(): void {
    const comment: string = this.commentForm.get('comment').value;
    this.comments$ = this.photoService
                         .addComments(this.photoId,comment)
                         .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
                         .pipe(tap(() => {
                            this.commentForm.reset();
                            this.photoEvent.emit(this.photoService.findById(this.photoId));
                          }));
  }
}