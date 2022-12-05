import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '@md/data';
import { AuthService } from './auth.service';
import { ModalLeaveYesNoComponent } from './modal/modal.leave-yes-no.component';

// Verifies that user is logged in before navigating to routes.
@Injectable()
export class LoggedInAuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('canActivate LoggedIn');
    return this.authService.currentUser$.pipe(
      map((user: UserInfo | undefined) => {
        if (user && user.token) {
          return true;
        } else {
          console.log('not logged in, reroute to /login');
          this.router.navigate(['login']);
          return false;
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivateChild LoggedIn');
    return this.canActivate();
  }
}

@Injectable()
export class SaveEditedWorkGuard {
  constructor(private modalService: NgbModal) {}

  canDeactivate(): Promise<boolean> {
    return this.modalService
      .open(ModalLeaveYesNoComponent)
      .result.then(() => true)
      .catch(() => false);
  }
}
