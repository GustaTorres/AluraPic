import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public checkUserNameTaken(userName: string): Observable<any> {
    return this.http.get(`${API_URL}/user/exists/${userName}`);
  }

  public signUp(newUser: NewUser): Observable<any> {
    return this.http.post(`${API_URL}/user/signup`,newUser);
  }
}
