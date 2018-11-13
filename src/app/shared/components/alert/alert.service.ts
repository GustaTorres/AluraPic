import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AlertTypeEnum } from './alert.enum';
import { Alert } from './alert.model';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        if(this.keepAfterRouteChange){
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  alertSubject: Subject<Alert> = new Subject();
  keepAfterRouteChange = false;

  success(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertTypeEnum.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertTypeEnum.WARNING, message, keepAfterRouteChange);
  }

  danger(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertTypeEnum.DANGER, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange: boolean = false): void {
    this.alert(AlertTypeEnum.INFO, message, keepAfterRouteChange);
  }

  private alert(alertTypeEnum: AlertTypeEnum, message: string, keepAfterRouteChange: boolean): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertTypeEnum, message));
  }

  getAlert(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }

  private clear(): void {
    this.alertSubject.next(null);
  }
}
