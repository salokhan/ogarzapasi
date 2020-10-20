import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locate-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  tryFacebookLogin(): void {
    this.authService.doFacebookLogin().then((res) => {
      this.router.navigate(['/test/']);
    });
  }

  tryTwitterLogin(): void {
    this.authService.doTwitterLogin().then((res) => {
      this.router.navigate(['/user']);
    });
  }

  tryGoogleLogin(): void {
    this.authService.doGoogleLogin().then((res) => {
      this.router.navigate(['/test/']);
    });
  }

  tryLogin(value): void {
    this.authService.doLogin(value).then(
      (res) => {
        if (res.user.emailVerified !== true) {
          this.router.navigate(['/account/verification/']);
        } else {
          this.router.navigate(['/test/']);
        }
      },
      (err) => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
