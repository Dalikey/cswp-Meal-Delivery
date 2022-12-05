import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../../../../libs/data/src';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() title!: string;
  isNavbarCollapsed = true;
  loggedInUser$!: Observable<UserInfo | undefined>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
