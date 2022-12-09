import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  meals$!: Observable<Meal[] | null | undefined>;

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.meals$ = this.mealService.getAllMeals();
  }

  deleteMeal(id: string) {
    this.mealService.deleteMeal(id).subscribe(() => {
      this.meals$ = this.mealService.getAllMeals();
    });
  }
}
