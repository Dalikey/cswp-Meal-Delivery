import {Injectable} from '@angular/core';
import {StudentHouse} from './studentHouse.model';

@Injectable({
  providedIn: 'root',
})
export class StudentHouseService {
  studentHouses: StudentHouse[] = [
    {
      id: '12345-123-11',
      streetAndNmr: 'Lovensdijkstraat 61',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-12',
      streetAndNmr: 'Lovensdijkstraat 62',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-13',
      streetAndNmr: 'Lovensdijkstraat 63',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-14',
      streetAndNmr: 'Lovensdijkstraat 64',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-15',
      streetAndNmr: 'Lovensdijkstraat 65',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-16',
      streetAndNmr: 'Lovensdijkstraat 66',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-17',
      streetAndNmr: 'Lovensdijkstraat 67',
      city: "Breda",
      postcode: "4818 AJ"
    },
    {
      id: '12345-123-18',
      streetAndNmr: 'Lovensdijkstraat 68',
      city: "Breda",
      postcode: "4818 AJ"
    },
  ];

  constructor() {
  }

  getAllStudentHouses(): StudentHouse[] {
    return this.studentHouses;
  }

  getStudentHouseById(id: string): StudentHouse {
    return this.studentHouses.filter((studentHouse: StudentHouse) => studentHouse.id === id)[0];
  }

  addStudentHouse(newStudentHouse: StudentHouse): void {
    this.studentHouses.push(newStudentHouse);
  }

  updateStudentHouse(updatedStudentHouse: StudentHouse) {
    let updatedStudentHouses = this.studentHouses.filter((studentHouse) => studentHouse.id !== updatedStudentHouse.id);
    updatedStudentHouses.push(updatedStudentHouse);
    this.studentHouses = updatedStudentHouses;
  }

  deleteStudentHouse(id: string) {
    let studentHouse = this.studentHouses.find((studentHouse) => studentHouse.id == id);
    let index = this.studentHouses.indexOf(studentHouse!);
    this.studentHouses.splice(index, 1);
  }
}
