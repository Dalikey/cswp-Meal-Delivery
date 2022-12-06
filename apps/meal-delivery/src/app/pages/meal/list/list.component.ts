import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  meals: Meal[] | undefined;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.mealService.getAllMeals().subscribe((meals: any) => {
      this.meals = meals.results;
    });
  }

  ngOnDestroy(): void {}

  deleteMeal(id: string) {
    this.mealService.deleteMeal(id);
  }

  toDecimal(price: number | undefined) {
    return price?.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  }
}
