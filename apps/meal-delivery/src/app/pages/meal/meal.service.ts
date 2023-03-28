import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { AddProductIds, Meal, RemoveProductIds } from './meal.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';
import { AlertService } from '../../shared/alert/alert.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService,
    private alertService: AlertService,
    private userService: UserService
  ) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllMeals(): Observable<Meal[] | null | undefined> {
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
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addMeal(newMeal: Meal) {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUserById(userId).subscribe((data) => {
        newMeal.owner = data?.username;
      });
    }

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
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Maaltijd bestaat al.');
          return of(undefined);
        })
      );
  }

  updateMeal(updatedMeal: Meal) {
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
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('U bent niet de eigenaar van deze maaltijd.');
          return of(undefined);
        })
      );
  }

  orderMeal(id: string) {
    return this.http
      .post<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/orderlist/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          this.alertService.success('Maaltijd succesvol besteld.');
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  cancelOrder(id: string) {
    return this.http
      .delete<Meal>(
        `${this.configService.getConfig().apiEndpoint}api/orderlist/${id}`,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          this.alertService.success('Maaltijd succesvol geannuleerd.');
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  addProductToMeal(ids: AddProductIds) {
    return this.http
      .post<AddProductIds>(
        `${this.configService.getConfig().apiEndpoint}api/productlist`,
        ids,
        this.httpOptions
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          this.alertService.success('Product succesvol toegevoegd.');
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  removeProductFromMeal(productIds: string[], id: string) {
    const params = new HttpParams().set('productIds', [productIds].join(','));
    return this.http
      .delete<RemoveProductIds>(
        `${this.configService.getConfig().apiEndpoint}api/productlist/${id}`,
        { ...this.httpOptions, params }
      )
      .pipe(
        tap(console.log),
        map((data: any) => {
          this.alertService.success('Product succesvol eruit gehaald.');
          return data.results;
        }),
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }

  deleteMeal(id: string) {
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
        catchError((e) => {
          console.log('Unable to connect to database. ' + e.error.message);
          this.alertService.error('Kan geen verbinding maken met de database.');
          return of(undefined);
        })
      );
  }
}
