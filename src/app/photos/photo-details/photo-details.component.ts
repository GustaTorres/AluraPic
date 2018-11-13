import { UserService } from './../../core/user/user.service';
import { AlertService } from './../../shared/components/alert/alert.service';
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
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
      ) { }

  ngOnInit() {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(this.photoId);
    this.photo$.subscribe(() => {},err => {
      console.log(err);
      this.router.navigate(['/not-found']);
    })
  }

  remove(): void {
    this.photoService
    .removePhoto(this.photoId)
    .subscribe(() => {
      this.alertService.success('Photo removed!',true);
      this.router.navigate(['/user',this.userService.getUserName()]);
    }, err => {
      console.log(err);
      this.alertService.warning('Could not remove the photo!');
    });
  }
}
