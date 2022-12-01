import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  componentId: string | null | undefined;
  componentExists: boolean = false;
  user: User | undefined;
  userName: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        console.log('Bestaande component');
        this.componentExists = true;
        this.user = {
          ...this.userService.getUserById(this.componentId),
        };
        this.userName = this.user.firstName + ' ' + this.user.lastName;
      } else {
        console.log('Nieuwe component');
        this.componentExists = false;
        this.user = {
          id: undefined,
          firstName: '',
          lastName: '',
          emailAddress: '',
          birthDate: new Date(),
          isGraduated: false,
          phoneNumber: '',
          token: '',
        };
      }
    });
  }

  onSubmit() {
    console.log('Submitting the form');
    if (this.componentExists) {
      this.userService.updateUser(this.user!);
      this.router.navigate(['user']);
    } else {
      this.user!.id = this.uuid();
      this.userService.addUser(this.user!);
      this.router.navigate(['user']);
    }
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
