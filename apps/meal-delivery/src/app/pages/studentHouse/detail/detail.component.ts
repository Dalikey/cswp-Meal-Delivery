import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { StudentHouse } from '../studentHouse.model';
import { StudentHouseService } from '../studentHouse.service';

@Component({
  selector: 'studentHouse-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  componentId: string | null | undefined;
  studentHouse: StudentHouse | undefined;
  studentHouse$!: Observable<StudentHouse>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentHouseService: StudentHouseService
  ) {}

  ngOnInit(): void {
    this.studentHouse$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.studentHouseService.read(params.get('id'))
      )
    );
  }
}
