import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdentity, UserInfo, UserLogin } from '@md/data';
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

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: UserInfo | undefined) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          // this.router.navigate(['/']);
          this.router.navigate(['user']);
        }
      });
    this.formData = {
      username: '',
      password: '',
    };
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.formData.username != '' && this.formData.password != '') {
      this.authService
        .login(this.formData)
        .subscribe((user: UserIdentity | undefined) => {
          if (user) {
            console.log('Logged in');
            // this.router.navigate(['/']);
            this.router.navigate(['user']);
          } else {
            console.error('Invalid data');
          }
        });
    }
  }
}
