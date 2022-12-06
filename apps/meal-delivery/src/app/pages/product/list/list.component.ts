import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, of, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { Alert, AlertService } from '../../../shared/alert/alert.service';
import { EntityService } from '../../entity/entity.service';
import { IEntity } from '../../entity/i.entity';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent<T extends IEntity> implements OnInit, OnDestroy {
  items!: T[] | null;
  subs: Subscription = new Subscription();
  httpOptions: any;

  constructor(
    private itemService: EntityService<T>,
    public alertService: AlertService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.itemService
        .list()
        .pipe(
          catchError((error: Alert) => {
            this.alertService.error(error.message);
            return of([]);
          })
        )
        .subscribe((items) => {
          console.log(items);
          this.items = items;
        })
    );
  }

  // delete(itemId: string): void {
  //   this.modalService
  //     .open(ModalConfirmYesNoComponent)
  //     .result.then((result) => {
  //       console.log('from modal:', result)
  //       this.itemService
  //         .delete(itemId, this.httpOptions)
  //         .pipe(
  //           catchError((error: Alert) => {
  //             console.log(error)
  //             this.alertService.error(error.message)
  //             return of(false)
  //           })
  //         )
  //         .subscribe(() => this.loadBases())
  //         .unsubscribe()
  //     })
  //     .catch((error) => console.log('from modal', error))
  // }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
