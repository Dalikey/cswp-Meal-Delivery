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

  // BECAUSE THIS USER LOGIN OR REGISTER WONT RELOAD :?/ I dont understand a single thing about this part.
  // private authService: AuthService,
  // constructor(private authService: AuthService, private router: Router) {console.log('---------------constructor----------------------');}
  constructor(private router: Router) {
    console.log('---------------constructor----------------------');
  }

  ngOnInit(): void {
    // this.subs = this.authService
    //   .getUserFromLocalStorage()
    //   .subscribe((user: UserInfo | undefined) => {
    //     if (user) {
    //       console.log('User already logged in > to dashboard');
    //       this.router.navigate(['/']);
    //     }
    //   });
    this.formData = {
      username: '',
      password: '',
    };
    console.log('-----------------login--------------------');
  }

  ngOnDestroy(): void {
    console.log('-----------------ondestroy--------------------');

    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // onSubmit(formData: UserLogin): void {
  onSubmit(): void {
    // formData: UserLogin
    console.log('-----------------formsubmit--------------------');
    // console.log(this.formData);
    // console.log(this.formData.username, this.formData.password);
    // this.authService
    //   .login(formData)
    //   .subscribe((user: UserIdentity | undefined) => {
    //     if (user) {
    //       console.log('Logged in');
    //       this.router.navigate(['/']);
    //     }
    //   });
  }
}
