import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private user$: Observable<User>;

  constructor(
      private userService: UserService,
      private router: Router) {
    this.user$ = this.userService.getUser();
   }

   public logout(): void {
    this.userService.logout();
    this.router.navigate(['']);
   }
}
