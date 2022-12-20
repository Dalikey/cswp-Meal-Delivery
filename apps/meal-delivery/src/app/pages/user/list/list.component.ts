import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SaveEditedWorkGuard } from '../../../auth/auth.guards';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users$!: Observable<User[] | null | undefined>;

  constructor(
    private userService: UserService,
    private saveEditedWorkGuard: SaveEditedWorkGuard
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

  deleteUser(id: string) {
    this.saveEditedWorkGuard.canDeactivate().then((result) => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => {
          this.users$ = this.userService.getAllUsers();
        });
      }
    });
  }
}
