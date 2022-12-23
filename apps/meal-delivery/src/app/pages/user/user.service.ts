import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { User } from './user.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,
    private alertService: AlertService
  ) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllUsers(): Observable<User[] | null | undefined> {
    return this.http
      .get<ApiResponse<User[]>>(
        `${this.configService.getConfig().apiEndpoint}api/user`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  getUserById(id: string): Observable<User | null | undefined> {
    return this.http
      .get<User>(
        `${this.configService.getConfig().apiEndpoint}api/user/${id}`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addUser(newUser: User) {
    return this.http
      .post<User>(
        `${this.configService.getConfig().apiEndpoint}api/user`,
        newUser,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Gebruiker bestaat al.');
          return of(undefined);
        })
      );
  }

  updateUser(updatedUser: User) {
    return this.http
      .put<User>(
        `${this.configService.getConfig().apiEndpoint}api/user/${
          updatedUser.id
        }`,
        updatedUser,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  deleteUser(id: string) {
    console.log(id);

    return this.http
      .delete<User>(
        `${this.configService.getConfig().apiEndpoint}api/user/${id}`,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }
}
