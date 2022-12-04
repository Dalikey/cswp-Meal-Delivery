import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentHouse } from '../studentHouse.model';
import { StudentHouseService } from '../studentHouse.service';

@Component({
  selector: 'studentHouse-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  studentHouses: StudentHouse[] | undefined;

  constructor(private studentHouseService: StudentHouseService) {}

  ngOnInit(): void {
    this.studentHouses = this.studentHouseService.getAllStudentHouses();
  }

  ngOnDestroy(): void {}

  deleteStudentHouse(id: string) {
    this.studentHouseService.deleteStudentHouse(id);
  }
}
