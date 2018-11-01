import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoService } from '../photo/photo.service';
import { Photo } from './../photo/photo';

@Component({
  selector: 'ap-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  public photo$: Observable<Photo>;
  public photoId: number;
 
  constructor(
        private activatedRoute: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router
      ) { }

  ngOnInit() {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
  }

  remove(): void {
    this.photoService
    .removePhoto(this.photoId)
    .subscribe(() => this.router.navigate(['']));
  }
}
