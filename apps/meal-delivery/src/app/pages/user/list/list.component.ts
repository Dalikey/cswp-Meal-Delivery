import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  users: User[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getAllUsers();
    console.log(this.users.length + ' users found.');
  }

  ngOnDestroy(): void {
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id);
  }
}
