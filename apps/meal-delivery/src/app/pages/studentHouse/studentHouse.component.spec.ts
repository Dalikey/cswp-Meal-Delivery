import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHouseComponent } from './studentHouse.component';

describe('StudentHouseComponent', () => {
  let component: StudentHouseComponent;
  let fixture: ComponentFixture<StudentHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentHouseComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
