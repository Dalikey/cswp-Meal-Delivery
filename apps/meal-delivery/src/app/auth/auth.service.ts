import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  IToken,
  UserIdentity,
  UserInfo,
  UserLogin,
  UserRegister,
} from '@md/data';
import { Router } from '@angular/router';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../shared/moduleconfig/config.service';
import { AlertService } from './../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<IToken | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private configService: ConfigService,
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: IToken | undefined) => {
          if (user) {
            this.currentUser$.next(user);
            console.log(
              'User from local storage:',
              this.decodeJwtToken(this.getAuthorizationToken() || '')
            );
            return of(user);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe();
  }

  decodeJwtToken(token: string) {
    if (token) {
      return jwt_decode(token);
    }
  }

  checkIsOwner(): boolean {
    const user = this.decodeJwtToken(this.getAuthorizationToken() || '') as any;
    return user?.role === 'owner';
  }

  checkIsAdmin(): boolean {
    const user = this.decodeJwtToken(this.getAuthorizationToken() || '') as any;
    return user?.role === 'admin';
  }

  checkIsStudent(): boolean {
    const user = this.decodeJwtToken(this.getAuthorizationToken() || '') as any;
    return user?.role === 'student';
  }

  login(formData: UserLogin): Observable<UserIdentity | undefined> {
    return this.http
      .post<UserIdentity>(
        `${this.configService.getConfig().apiEndpoint}auth-api/auth/login`,
        formData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((data: any) => {
          location.reload();
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(data.results));
          this.currentUser$.next(data);
          this.alertService.success('Je bent ingelogd');
          return data;
        }),
        catchError((error) => {
          console.log('Error message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: UserRegister): Observable<UserInfo | undefined> {
    return this.http
      .post<UserInfo>(
        `${this.configService.getConfig().apiEndpoint}auth-api/auth/register`,
        userData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((data: any) => {
          localStorage.setItem(this.CURRENT_USER, JSON.stringify(data.results));
          this.currentUser$.next(data);
          this.alertService.success('Je bent geregistreerd');
          return data;
        }),
        catchError((error) => {
          console.log('Error message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          this.alertService.success('Je bent uitgelogd.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('Error message:', error.error.message));
  }

  getUserFromLocalStorage(): Observable<UserInfo | undefined> {
    const user = localStorage.getItem(this.CURRENT_USER);

    if (user) {
      const localUser = JSON.parse(user);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  getAuthorizationToken(): string | undefined {
    const user = localStorage.getItem(this.CURRENT_USER);
    if (user) {
      const localUser = JSON.parse(user);
      return localUser.token;
    }
    return undefined;
  }

  getCurrentUserId(): string | undefined {
    const user = localStorage.getItem(this.CURRENT_USER);
    if (user) {
      const localUser = JSON.parse(user);
      return localUser.id;
    }
    return undefined;
  }
}
