import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lowerCaseValidator } from '../../shared/validators/lowe-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  @ViewChild('emailInput')
  public emailInput: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
              private userNotTakenValidatorService: UserNotTakenValidatorService,
              private signUpService: SignupService,
              private router: Router,
              private platformDetectorService: PlatformDetectorService) { }
  ngOnInit() {
      this.signupForm = this.formBuilder.group({
        email: ['', 
            [
              Validators.required,
              Validators.email
            ]
        ],
        fullName: ['', 
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(40)
            ]
        ],
       userName: ['', 
            [
              Validators.required,
              lowerCaseValidator,
              Validators.minLength(2),
              Validators.maxLength(30)
            ],
            this.userNotTakenValidatorService.checkUserNameTaken()
        ],
        password: ['',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(14)
            ]   
      ]
    });
    this.setFocusEmail();
  }

  public signUp(): void {
    const newUser: NewUser = this.signupForm.getRawValue();
    this.signUpService
          .signUp(newUser)
          .subscribe(() => {
            this.router.navigate([''])
          }, err => {
            console.log(err);
          });
  }

  private setFocusEmail(): void {
    this.platformDetectorService.isPlatFormBrowser() &&
    this.emailInput.nativeElement.focus();
  }
}
