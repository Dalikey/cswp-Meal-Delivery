import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Meal} from '../meal.model';
import {
  MealService
} from '../meal.service';

@Component({
  selector: 'user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  componentId: string | null | undefined;
  componentExists: boolean = false;
  meal: Meal | undefined;
  mealName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        this.meal = {
          ...this.mealService.getMealById(this.componentId),
        };
        this.mealName = this.meal.name;
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        this.meal = {
          id: undefined,
          name: '',
          price: 0,
          deliveryDate: new Date(),
          deliveryTime: new Date(),
        };
      }
    });
  }

  onSubmit() {
    console.log('Submitting the form');
    if (this.componentExists) {
      this.mealService.updateMeal(this.meal!);
      this.router.navigate(['meal']);
    } else {
      this.meal!.id = this.uuid();
      this.mealService.addMeal(this.meal!);
      this.router.navigate(['meal']);
    }
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
