import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  componentId: string | null | undefined;
  meal: Meal | undefined;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.meal = this.mealService.getMealById(this.componentId);
      }
    });
  }

  toDecimal(price: number | undefined) {
    return price?.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  }
}
