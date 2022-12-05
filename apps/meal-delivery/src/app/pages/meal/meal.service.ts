import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../../../../../libs/data/src';
import { Meal } from './meal.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  meals: Meal[] = [
    {
      id: '12345-123-12',
      name: 'Pasta Bolognese met tomaat, spekjes en kaas',
      price: 9.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-23',
      name: 'Aubergine uit de oven met feta, muntrijst en tomatensaus',
      price: 8.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-56',
      name: 'Spaghetti met tapenadekip uit de oven en frisse salade',
      price: 9.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-13',
      name: 'Heerlijke zuurkoolschotel, dé winterkost bij uitstek.',
      price: 3.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-14',
      name: 'Mooie zomerse salade met veel groente',
      price: 6.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-15',
      name: 'Hamburger met friet',
      price: 5.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-16',
      name: 'Kipburger met friet',
      price: 5.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
    {
      id: '12345-123-17',
      name: 'Twee unox broodjes',
      price: 3.0,
      deliveryTime: new Date(),
      deliveryDate: new Date(),
      restaurant: 'Avans restaurant',
    },
  ];

  constructor(private http: HttpClient) {}

  getAllMeals(): Observable<Meal[]> {
    // return this.meals;

    return this.http
      .get<ApiResponse<Meal[]>>('http://localhost:3333')
      .pipe(tap(console.log));
  }

  getMealById(id: string): Meal {
    return this.meals.filter((meal: Meal) => meal.id === id)[0];
  }

  addMeal(newMeal: Meal): void {
    if (newMeal.deliveryTime !== undefined) {
      if (newMeal.deliveryTime.toString().match('\\d{2}:\\d{2}')) {
        var time = newMeal!.deliveryTime.toString().split(':');
        newMeal.deliveryTime = new Date();
        newMeal.deliveryTime.setHours(+time[0]);
        newMeal.deliveryTime.setMinutes(+time[1]);
      }
    }
    if (newMeal.deliveryTime?.toString() == 'Invalid Date') {
      newMeal.deliveryTime = new Date();
    }
    newMeal.deliveryDate = new Date(newMeal!.deliveryDate!);
    this.meals.push(newMeal);
  }

  updateMeal(updatedMeal: Meal) {
    let updatedMeals = this.meals.filter((meal) => meal.id !== updatedMeal.id);

    if (updatedMeal.deliveryTime !== undefined) {
      if (updatedMeal.deliveryTime.toString().match('\\d{2}:\\d{2}')) {
        var time = updatedMeal!.deliveryTime.toString().split(':');
        updatedMeal.deliveryTime = new Date();
        updatedMeal.deliveryTime.setHours(+time[0]);
        updatedMeal.deliveryTime.setMinutes(+time[1]);
      }
    }
    updatedMeal.deliveryDate = new Date(updatedMeal!.deliveryDate!);
    updatedMeals.push(updatedMeal);
    this.meals = updatedMeals;
  }

  deleteMeal(id: string) {
    let meal = this.meals.find((meal) => meal.id == id);
    let index = this.meals.indexOf(meal!);
    this.meals.splice(index, 1);
  }
}
