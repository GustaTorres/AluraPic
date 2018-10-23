import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router){ }

    public canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

            if(this.userService.isLogged()){
                this.router.navigate(['user',this.userService.getUserName()]);
                return false;
            }
            return true;
    }
}