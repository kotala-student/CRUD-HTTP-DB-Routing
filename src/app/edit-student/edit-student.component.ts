import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { StudentListComponent } from '../student-list/student-list.component';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  editStudent: Student;
  //to access the form using the template variable representing the form.

  constructor(private stdService: StudentService, private router: Router) {}

  ngOnInit() {
    this.stdService.currentStudent.subscribe((data: Student) => {
      console.log(
        'This is the editStudent in edit student component ' + data.id
      );
      this.editStudent = {
        id: data.id,
        studentID: data.studentID,
        name: data.name,
        age: data.age,
      };
      // console.log(this.editStudent);
    });
  }

  onSubmit(newStudent: { sName: string; sAge: string }) {
    console.log(newStudent);
    console.log(newStudent.sAge);
    const student: Student = {
      name: newStudent.sName,
      age: Number(newStudent.sAge),
      id: this.editStudent.id,
      studentID: this.editStudent.studentID,
    };
    console.log('The new value of student name is ' + student.name);
    this.stdService
      .updateStudent(this.editStudent.id, student)
      .subscribe((data) => console.log(data));
    this.stdService.getStudents().subscribe();
    this.router.navigateByUrl('/student-list');
  }
}
