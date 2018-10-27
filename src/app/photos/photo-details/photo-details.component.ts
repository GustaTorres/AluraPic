import { Observable } from 'rxjs';
import { Photo } from './../photo/photo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

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
    const id = this.activatedRoute.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(id)
  }

}
