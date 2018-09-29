import { SignupService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from '../../shared/validators/lowe-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { Router } from '@angular/router';

@Component({
  selector: 'ap-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userNotTakenValidatorService: UserNotTakenValidatorService,
              private signUpService: SignupService,
              private router: Router) { }
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
}
