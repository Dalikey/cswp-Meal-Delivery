import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IToken, UserInfo } from '@md/data';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() title!: string;
  isNavbarCollapsed = true;
  loggedInUser$!: Observable<IToken | undefined>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
