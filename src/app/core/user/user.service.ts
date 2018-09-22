import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && 
      this.decodeAndNotify();
   }

  public setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(): void {
    const token = this.tokenService.getToken();
    const user: User = jwt_decode(token);
    this.userName = user.name;
    this.userSubject.next(user);
  }

  public logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  public isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  public getUserName(): string{
    return this.userName;
  }
}
