import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ap-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  private fromUrl;
  private subscriptions: Subscription = new Subscription();
  public loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private platformDetectorService: PlatformDetectorService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe((params: Params) => this.fromUrl = params['fromUrl']);
    this.createLoginForm();
    this.setFocusUserName();
  }

  private createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public login(): void {

    const userName: string = this.loginForm.get('userName').value;
    const password: string = this.loginForm.get('password').value;

    this.authService
          .authenticate(userName,password)
          .subscribe(res => { this.fromUrl 
                              ? this.router.navigateByUrl(this.fromUrl) 
                              : this.router.navigate(['user',userName]);
                            }, err => {
                                console.log(err.error.message);
                                this.loginForm.reset();

                                this.setFocusUserName();
                                alert('Username or password invalid!');
                            });
  }

  private setFocusUserName(): void {
    this.platformDetectorService.isPlatFormBrowser() &&
    this.userNameInput.nativeElement.focus();
  }
}
