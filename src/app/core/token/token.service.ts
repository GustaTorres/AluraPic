import { Injectable } from '@angular/core';

const KEY_TOKEN = 'acessToken';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  
  constructor() { }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string): void {
    window.localStorage.setItem(KEY_TOKEN,token);
  }

  public getToken(): string {
    return window.localStorage.getItem(KEY_TOKEN);
  }

  public removeToken(): void {
    window.localStorage.removeItem(KEY_TOKEN)
  }
}
