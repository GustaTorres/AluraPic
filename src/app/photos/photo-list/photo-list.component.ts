import { PhotoService } from './../photo/photo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from './../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  public photos: Photo[] = [];
  public filter: string = '';
  public debounce: Subject<string> = new Subject();
  public hasMore: boolean = true;
  private currentPage: number = 1;
  private userName: string = '';
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) {}
  
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params['userName'];
    this.photos = this.activatedRoute.snapshot.data['photos'];
    this.debounce
    .pipe(debounceTime(300))
    .subscribe(filter => this.filter = filter);
  }

  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  public load(): void {
    this.photoService.listFromUserPaginated(this.userName,++this.currentPage)
          .subscribe(photos => {
            this.photos = this.photos.concat(photos);

            if(!photos.length){
              this.hasMore = false;
            }

          });
  }

}