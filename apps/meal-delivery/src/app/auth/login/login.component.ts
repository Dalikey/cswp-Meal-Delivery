import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserIdentity,
  UserInfo,
  UserLogin,
} from '../../../../../../libs/data/src/index';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subs!: Subscription;
  formData: UserLogin;

  constructor(public authService: AuthService, private router: Router) {
    console.log('---------------constructor----------------------');
    console.log(this.formData);
  }

  ngOnInit(): void {
    console.log('-----------------local--------------------');
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: UserInfo | undefined) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
    this.formData = {
      username: '',
      password: '',
    };
    console.log('-----------------login--------------------');
    console.log(this.formData);
  }

  ngOnDestroy(): void {
    console.log('-----------------ondestroy--------------------');
    console.log(this.formData);
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    console.log('-----------------formsubmit--------------------');
    console.log(this.formData);
    console.log(this.subs);
    if (this.formData.username != '' && this.formData.password != '') {
      console.log('-----------------if--------------------');
      console.log(this.formData.username, this.formData.password);
      this.authService
        .login(this.formData)
        .subscribe((user: UserIdentity | undefined) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          } else {
            console.error('Invalid data');
          }
        });
    }
  }
}
