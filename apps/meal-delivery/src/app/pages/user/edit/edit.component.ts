import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserInfo } from '@md/data';
import { Subscription, tap, switchMap, of, catchError } from 'rxjs';
import { AlertService, Alert } from '../../../shared/alert/alert.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  title = '';
  user!: User;
  userid!: number | undefined;
  httpOptions: any;
  debug = false;

  subscriptionOptions!: Subscription;
  subscriptionParams!: Subscription;
  subscriptionStudios!: Subscription;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Haal de user op voor edit
    this.subscriptionParams = this.route.paramMap
      .pipe(
        tap(console.log),
        switchMap((params: ParamMap) => {
          // als we een nieuw item maken is er geen 'id'
          if (!params.get('id')) {
            return of({} as UserInfo);
          } else {
            return this.userService.read(params.get('id'));
          }
        }),
        tap(console.log)
      )
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  // Save user via the service
  onSubmit(): void {
    console.log('onSubmit', this.user);

    if (this.user.id) {
      // A user with id must have been saved before, so it must be an update.
      console.log('update user');
      this.userService
        .update(this.user, this.httpOptions)
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
      // A user without id has not been saved to the database before.
      console.log('create user');
      this.userService
        .create(this.user, this.httpOptions)
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
    this.subscriptionOptions.unsubscribe();
    this.subscriptionParams.unsubscribe();
    this.subscriptionStudios.unsubscribe();
  }
}
