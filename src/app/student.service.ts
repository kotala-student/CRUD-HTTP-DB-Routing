import { EventEmitter, Injectable, Output } from '@angular/core';
import { Student } from './student';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  nextID: number = 0;

  private data: BehaviorSubject<Student> = new BehaviorSubject<Student>(null);
  // private data: BehaviorSubject<String> = new BehaviorSubject<String>(null);
  currentStudent = this.data.asObservable();

  API: string = 'https://demohttpedit-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  getNextID(): number {
    return ++this.nextID;
  }

  addStudent(newStd: Student) {
    return this.http.post(this.API + 'student.json', newStd);
  }

  setCurrentStudent(data: Student) {
    this.data.next(data);
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API + 'student.json').pipe(
      map((responseData) => {
        // console.log(`the response data is ${responseData}`);
        const studentArray: Student[] = [];

        for (let key in responseData) {
          // console.log(`The key is {key}`);
          //check out https://www.youtube.com/watch?v=Nuh6hTDh31s&list=PL1BztTYDF-QNrtkvjkT6Wjc8es7QB4Gty&index=100&ab_channel=procademy
          //... is the spread operator., key is assigned as the id property of student.
          if (responseData.hasOwnProperty(key))
            studentArray.push({ ...responseData[key], id: key });
        }
        // console.log(`the studentArray is ${studentArray}`);
        return studentArray;
      })
    );
  }

  deleteStudent(id: string) {
    return this.http.delete(this.API + 'student/' + id + '.json');
  }

  updateStudent(id: string, newStd: Student) {
    return this.http.put(this.API + 'student/' + id + '.json', newStd);
  }

  clearData() {
    this.nextID = 0;
    return this.http.delete(this.API + 'student.json');
  }
}
