import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    

    const userName: string = this.loginForm.get('userName').value;
    const password: string = this.loginForm.get('password').value;

    this.authService
          .authenticate(userName,password)
          .subscribe(res => {
                              console.log('logou');
                              this.router.navigate(['user',userName])
                            },
                     err => {
                       console.log(err.error.message);
                       this.loginForm.reset();

                       this.platformDetectorService.isPlatFormBrowser() &&
                          this.userNameInput.nativeElement.focus();
                       alert('Username or password invalid!');
                      });
  }
}
