import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { StudentHouse } from './studentHouse.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class StudentHouseService {
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

  getAllStudentHouses(): Observable<StudentHouse[] | null | undefined> {
    return this.http
      .get<ApiResponse<StudentHouse[]>>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse`,
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

  getStudentHouseById(id: string): Observable<StudentHouse | null | undefined> {
    return this.http
      .get<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${id}`,
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

  addStudentHouse(newStudentHouse: StudentHouse) {
    return this.http
      .post<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse`,
        newStudentHouse,
        this.httpOptions
      )
      .pipe(
        map((data: any) => {
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Studentenhuis bestaat al.');
          return of(undefined);
        })
      );
  }

  updateStudentHouse(updatedStudentHouse: StudentHouse) {
    return this.http
      .put<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${
          updatedStudentHouse.id
        }`,
        updatedStudentHouse,
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

  deleteStudentHouse(id: string) {
    return this.http
      .delete<StudentHouse>(
        `${this.configService.getConfig().apiEndpoint}api/studentHouse/${id}`,
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
