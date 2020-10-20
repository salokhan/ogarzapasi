import { Component } from '@angular/core';
import { Router, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  submitted = false;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.registerForm.controls; }

  createForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  tryFacebookLogin(): void {
    this.authService.doFacebookLogin().then(
      (res) => {
        this.router.navigate(['/user']);
      },
      (err) => console.log(err)
    );
  }

  tryTwitterLogin(): void {
    this.authService.doTwitterLogin().then(
      (res) => {
        this.router.navigate(['/user']);
      },
      (err) => console.log(err)
    );
  }

  tryGoogleLogin(): void {
    this.authService.doGoogleLogin().then(
      (res) => {
        this.router.navigate(['/test/']);
      },
      (err) => console.log(err)
    );
  }

  tryRegister(value): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.doRegister(value).then(
        (res) => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Your account has been created';
        },
        (err) => {
          console.log(err);
          //this.errorMessage = err.message;
          this.successMessage = '';
        }
      );
    }

  }
}
