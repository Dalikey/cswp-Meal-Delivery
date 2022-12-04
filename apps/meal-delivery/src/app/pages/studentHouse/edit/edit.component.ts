import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentHouse} from '../studentHouse.model';
import {StudentHouseService} from '../studentHouse.service';

export enum AllergyTypesEnum {
  gerst = 'gerst',
  gluten = 'gluten',
  mais = 'mais',
  peulvruchten = 'peulvruchten',
  soja = 'soja',
  tarwe = 'tarwe',
  wortel = 'wortel',
}

@Component({
  selector: 'studentHouse-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  componentId: string | null | undefined;
  componentExists: boolean = false;
  studentHouse: StudentHouse | undefined;
  studentHouseName: string | undefined;
  public allergyTypes = Object.values(AllergyTypesEnum);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentHouseService: StudentHouseService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.componentId = params.get('id');
      if (this.componentId) {
        this.componentExists = true;
        this.studentHouse = {
          ...this.studentHouseService.getStudentHouseById(this.componentId),
        };
        this.studentHouseName = this.studentHouse.streetAndNmr;
      } else {
        this.componentExists = false;
        this.studentHouse = {
          id: undefined,
          streetAndNmr: '',
          city: '',
          postcode: '',
        };
      }
    });
  }

  onSubmit() {
    if (this.componentExists) {
      this.studentHouseService.updateStudentHouse(this.studentHouse!);
      this.router.navigate(['studentHouse']);
    } else {
      this.studentHouse!.id = this.uuid();
      this.studentHouseService.addStudentHouse(this.studentHouse!);
      this.router.navigate(['studentHouse']);
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
