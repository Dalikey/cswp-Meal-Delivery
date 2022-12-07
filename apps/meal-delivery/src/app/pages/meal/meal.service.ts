import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { Meal } from './meal.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { AlertService } from '../../shared/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
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
  private token = this.authService.getAuthorizationToken();

  getAllMeals(): Observable<Meal[] | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pZXAiLCJpZCI6IjE4MTkyYzFiLTY1NTItNGRlMS1hMWM1LTQ0OTdmMDAyNDk2OCIsImlhdCI6MTY2OTYxODkxN30.YhZS0zdX-sHfcUu0QVzBQsyvWHwj9KLf1pTf4VBRFNE'
    );

    return this.http
      .get<ApiResponse<Meal[]>>(
        `${this.configService.getConfig().apiEndpoint}api/meal`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError((error) => {
          console.log('Unable to connect to database.' + error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  getMealById(id: string): Observable<Meal | null | undefined> {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pZXAiLCJpZCI6IjE4MTkyYzFiLTY1NTItNGRlMS1hMWM1LTQ0OTdmMDAyNDk2OCIsImlhdCI6MTY2OTYxODkxN30.YhZS0zdX-sHfcUu0QVzBQsyvWHwj9KLf1pTf4VBRFNE'
    );

    return this.http
      .get<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/meal/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addMeal(newMeal: Meal) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .post<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/meal`,
        newMeal,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  updateMeal(updatedMeal: Meal) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .put<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/meal/${
          updatedMeal.id
        }`,
        updatedMeal,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  deleteMeal(id: string) {
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      this.token!
    );

    return this.http
      .delete<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/meal/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          return data.results;
        }),
        catchError(() => {
          console.log('Unable to connect to database.');
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }
}
