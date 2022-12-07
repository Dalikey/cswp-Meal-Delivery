import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { StudentHouse } from './studentHouse.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';

@Injectable({
  providedIn: 'root',
})
export class StudentHouseService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService
  ) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private token = this.authService.getAuthorizationToken();

  getAllStudentHouses(): Observable<StudentHouse[] | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .get<ApiResponse<StudentHouse[]>>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          return of(undefined);
        })
      );
  }

  getStudentHouseById(id: string): Observable<StudentHouse | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .get<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          return of(undefined);
        })
      );
  }

  addStudentHouse(newStudentHouse: StudentHouse) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .post<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse`,
        newStudentHouse,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          return of(undefined);
        })
      );
  }

  updateStudentHouse(updatedStudentHouse: StudentHouse) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .put<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${
          updatedStudentHouse.id
        }`,
        updatedStudentHouse,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          return of(undefined);
        })
      );
  }

  deleteStudentHouse(id: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .delete<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          return of(undefined);
        })
      );
  }
}
