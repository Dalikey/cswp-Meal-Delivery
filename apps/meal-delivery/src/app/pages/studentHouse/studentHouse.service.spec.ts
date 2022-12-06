import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StudentHouse } from './studentHouse.model';
import { StudentHouseService } from './studentHouse.service';

// // Global mock objects
// const expectedStudentHouses: StudentHouse[] = [
//   {
//     id: '12345-123-11',
//     streetAndNmr: 'Lovensdijkstraat 61',
//     city: "Breda",
//     postcode: "4818 AJ"
//   },
// ];

describe('StudentHouseService', () => {
  let service: StudentHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }],
    });
    service = TestBed.inject(StudentHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //   it('should return a list of studentHouses', (done: DoneFn) => {
  //     const studentHouses = service.getAllStudentHouses();
  //     expect(studentHouses.length).toBe(8);
  //     expect(studentHouses[0].id).toEqual(expectedStudentHouses[0].id);
  //     done();
  //   });

  //   it('should return Lovensdijkstraat 67', (done: DoneFn) => {
  //     const studentHouse = service.getStudentHouseById('12345-123-17');
  //     expect(studentHouse.streetAndNmr).toEqual('Lovensdijkstraat 67');
  //     done();
  //   });

  //   it('should add a studentHouse', (done: DoneFn) => {
  //     const newStudentHouse = {
  //       id: '12345-123-20',
  //       streetAndNmr: 'Lovensdijkstraat 69',
  //       city: "Breda",
  //       postcode: "4818 AJ"
  //     };
  //     service.addStudentHouse(newStudentHouse);
  //     expect(service.getAllStudentHouses().length).toEqual(9);
  //     done();
  //   });

  //   it('should update a studentHouse', (done: DoneFn) => {
  //     const newStudentHouse = {
  //       id: '12345-123-12',
  //       streetAndNmr: 'Lovensdijkstraat 100',
  //       city: "Breda",
  //       postcode: "4818 AJ"
  //     };
  //     service.updateStudentHouse(newStudentHouse);
  //     expect(service.getStudentHouseById('12345-123-12').streetAndNmr).toEqual(
  //       'Lovensdijkstraat 100'
  //     );
  //     expect(service.getStudentHouseById('12345-123-12').streetAndNmr).not.toEqual(
  //       'Lovensdijkstraat 62'
  //     );
  //     done();
  //   });

  //   it('should delete a studentHouse', (done: DoneFn) => {
  //     service.deleteStudentHouse('12345-123-18');
  //     expect(service.getStudentHouseById('12345-123-18')).toBeUndefined();
  //     done();
  //   });
});
