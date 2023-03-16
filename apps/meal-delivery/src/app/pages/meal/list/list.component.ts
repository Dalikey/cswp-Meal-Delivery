import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveEditedWorkGuard } from '../../../auth/auth.guards';
import { AuthService } from '../../../auth/auth.service';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  meals$!: Observable<Meal[] | null | undefined>;
  isOwner: boolean;

  constructor(
    private mealService: MealService,
    private saveEditedWorkGuard: SaveEditedWorkGuard,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.meals$ = this.mealService.getAllMeals();
    this.isOwner = this.authService.checkIsOwner();
  }

  deleteMeal(id: string) {
    this.saveEditedWorkGuard.canDeactivate().then((result) => {
      if (result) {
        this.mealService.deleteMeal(id).subscribe(() => {
          this.meals$ = this.mealService.getAllMeals();
        });
      }
    });
  }
}
