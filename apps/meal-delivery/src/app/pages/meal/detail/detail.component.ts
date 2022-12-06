import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
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
  meal$!: Observable<Meal>;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.meal$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.mealService.read(params.get('id')))
    );
  }

  toDecimal(price: number | undefined) {
    return price?.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  }
}
