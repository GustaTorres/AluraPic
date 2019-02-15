import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerLog } from './server-log';

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {

  constructor(private httpClient: HttpClient) { }

  log(serverLog: ServerLog): Observable<any> {
    return this.httpClient.post(`${environment.apiLog}/infra/log`, serverLog);
  }
}
