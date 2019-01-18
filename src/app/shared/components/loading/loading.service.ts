import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LoadingTypeEnum } from './loading-type.enum';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingSubject = new Subject<LoadingTypeEnum>();

  getLoading(): Observable<LoadingTypeEnum> {
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingTypeEnum.STOPPED));
  }

  start(): void {
    this.loadingSubject.next(LoadingTypeEnum.LOADING);
  }

  stop(): void {
    this.loadingSubject.next(LoadingTypeEnum.STOPPED);
  }
}
