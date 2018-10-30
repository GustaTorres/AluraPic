import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photo-comment';
import { PhotoService } from '../photo/photo.service';
import { Photo } from './../photo/photo';

@Component({
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  public photo$: Observable<Photo>;
 
  constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService
      ) { }

  ngOnInit() {
    const photoId = this.activatedRoute.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(photoId);
  }
}
