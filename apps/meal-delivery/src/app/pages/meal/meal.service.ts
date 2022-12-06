import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '@md/data';
import { Meal } from './meal.model';
import { AuthService } from '../../auth/auth.service';
import { ConfigService } from '../../shared/moduleconfig/config.service';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  getAllMeals(): Observable<Meal[]> {
    const token = this.authService.getAuthorizationToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    httpOptions.headers = httpOptions.headers.set('Authorization', token!);

    return this.http
      .get<ApiResponse<Meal[]>>(
        `${this.configService.getConfig().apiEndpoint}api/meal`,
        httpOptions
      )
      .pipe(tap(console.log));
  }

  getMealById(id: string): Meal {
    return new Meal();
  }

  addMeal(newMeal: Meal): void {}

  updateMeal(updatedMeal: Meal) {}

  deleteMeal(id: string) {}
}
