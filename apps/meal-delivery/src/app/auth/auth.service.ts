import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserIdentity, UserInfo, UserLogin, UserRegister } from '@md/data';
import { Router } from '@angular/router';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../shared/moduleconfig/config.service';
import { AlertService } from './../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  public currentUserToken$ = new BehaviorSubject<string | undefined>(undefined);
  public currentUserId$ = new BehaviorSubject<string | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly CURRENT_USERTOKEN = 'currentusertoken';
  private readonly CURRENT_USERID = 'currentuserid';
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
        switchMap((user: UserInfo | undefined) => {
          if (user) {
            console.log('User found in local storage');
            console.log(user);
            this.currentUser$.next(user);
            return of(user);
          } else {
            return of(undefined);
          }
        })
      )
      .subscribe();
  }

  login(formData: UserLogin): Observable<UserIdentity | undefined> {
    console.log(
      `login at ${
        this.configService.getConfig().apiEndpoint
      }auth-api/auth/login`
    );
    return this.http
      .post<UserIdentity>(
        `${this.configService.getConfig().apiEndpoint}auth-api/auth/login`,
        formData,
        {
          headers: this.headers,
        }
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          const token = data.results.token;
          const id = data.results.id;
          console.log('Authorization token: ' + token);
          console.log('Authorization id: ' + id);
          localStorage.setItem(this.CURRENT_USERTOKEN, JSON.stringify(token));
          localStorage.setItem(this.CURRENT_USERID, JSON.stringify(id));
          this.currentUser$.next(token);
          this.currentUserToken$.next(token);
          this.currentUserId$.next(id);
          this.alertService.success('Je bent ingelogd');
          return data;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alertService.error(error.error.message || error.message);
          return of(undefined);
        })
      );
  }

  register(userData: UserRegister): Observable<UserInfo | undefined> {
    console.log(
      `register at ${
        this.configService.getConfig().apiEndpoint
      }auth-api/auth/register`
    );
    console.log(userData);
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
          const token = data.results.token;
          const id = data.results.id;
          console.log('Authorization token: ' + token);
          console.log('Authorization id: ' + id);
          localStorage.setItem(this.CURRENT_USERTOKEN, JSON.stringify(token));
          localStorage.setItem(this.CURRENT_USERID, JSON.stringify(id));
          this.currentUser$.next(token);
          this.currentUserToken$.next(token);
          this.currentUserId$.next(id);
          this.alertService.success('Je bent geregistreerd');
          return data;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
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
          localStorage.removeItem(this.CURRENT_USERTOKEN);
          localStorage.removeItem(this.CURRENT_USERID);
          this.currentUser$.next(undefined);
          this.alertService.success('Je bent uitgelogd.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<UserInfo | undefined> {
    const user = localStorage.getItem(this.CURRENT_USER);
    const userToken = localStorage.getItem(this.CURRENT_USERTOKEN);
    const userId = localStorage.getItem(this.CURRENT_USERID);

    if (user) {
      const localUser = JSON.parse(user);
      return of(localUser);
    } else if (userToken) {
      const localUserToken = JSON.parse(userToken);
      return of(localUserToken);
    } else {
      return of(undefined);
    }
  }

  userMayEdit(itemUserId: string): Observable<boolean> {
    console.log('userMayEdit');
    return this.currentUserId$.pipe(
      map((userId: string | undefined) =>
        userId ? userId === itemUserId : false
      )
    );
  }

  getAuthorizationToken(): string | undefined {
    const user = localStorage.getItem(this.CURRENT_USER);
    if (user) {
      return user!.replace(/['"]+/g, '');
    }
    const token = localStorage.getItem(this.CURRENT_USERTOKEN);
    if (token) {
      return token!.replace(/['"]+/g, '');
    }
    return undefined;
  }

  getCurrentUserId(): string | undefined {
    const token = localStorage.getItem(this.CURRENT_USERID);
    if (token) {
      return token!.replace(/['"]+/g, '');
    }
    return undefined;
  }
}
