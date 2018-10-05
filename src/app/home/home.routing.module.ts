import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { HomeComponent } from './home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { 
                path: '', 
                component: SigninComponent,
            },
            { 
                path: 'signup', 
                component: SignupComponent
            },
        
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule { }