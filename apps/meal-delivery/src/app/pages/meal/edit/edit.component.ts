import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, of, Subscription, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { Alert, AlertService } from '../../../shared/alert/alert.service';
import { StudentHouse } from '../../studentHouse/studentHouse.model';
import { StudentHouseService } from '../../studentHouse/studentHouse.service';
import { Meal } from '../meal.model';
import { MealService } from '../meal.service';

@Component({
  selector: 'meal-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  componentId: string | null | undefined;
  componentExists: boolean = false;
  meal: Meal | undefined;
  mealid!: number | undefined;
  debug = false;
  studentHouses: StudentHouse[];

  subscriptionOptions!: Subscription;
  subscriptionParams!: Subscription;
  subscriptionStudios!: Subscription;

  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private mealService: MealService,
    private studentHouseService: StudentHouseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptionParams = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.componentId = params.get('id');
          if (!params.get('id')) {
            this.componentExists = false;
            this.studentHouseService
              .getAllStudentHouses()
              .subscribe((studentHouses: StudentHouse[] | null | undefined) => {
                if (studentHouses) {
                  this.studentHouses = studentHouses;
                }
              });
            return of({
              name: '',
              price: 1,
              deliveryTime: new Date(),
              deliveryDate: new Date(),
              studentHouseId: '',
            } as Meal);
          } else {
            this.componentExists = true;
            this.studentHouseService
              .getAllStudentHouses()
              .subscribe((studentHouses: StudentHouse[] | null | undefined) => {
                if (studentHouses) {
                  this.studentHouses = studentHouses;
                }
              });
            return this.mealService.getMealById(params.get('id')!);
          }
        }),
        tap(console.log)
      )
      .subscribe((meal: Meal) => {
        this.meal = meal;
      });
  }

  onSubmit() {
    console.log('onSubmit', this.meal);

    if (this.meal!.id) {
      // A meal with id must have been saved before, so it must be an update.
      console.log('update meal');
      this.mealService
        .updateMeal(this.meal!)
        .pipe(
          catchError((error: Alert) => {
            console.log(error);
            this.alertService.error(error.message);
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    } else {
      // A meal without id has not been saved to the database before.
      console.log('create meal');
      this.mealService
        .addMeal(this.meal!)
        .pipe(
          catchError((error: Alert) => {
            console.log(error);
            this.alertService.error(error.message);
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (
      this.subscriptionOptions &&
      this.subscriptionParams &&
      this.subscriptionStudios
    ) {
      this.subscriptionOptions.unsubscribe();
      this.subscriptionParams.unsubscribe();
      this.subscriptionStudios.unsubscribe();
    }
  }
}
