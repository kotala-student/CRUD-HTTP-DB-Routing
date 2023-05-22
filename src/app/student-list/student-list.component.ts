import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];

  constructor(private stdService: StudentService, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.stdService.getStudents().subscribe((data) => {
      this.studentList = data;
      console.log(data);
    });
  }

  onDeleteStudent(id: string) {
    this.stdService.deleteStudent(id).subscribe((data) => {
      console.log(`Deletion successful`);
      this.fetchData();
    });
  }

  onUpdateStudent(id: string) {
    //get the student based on the id
    let currentStudent: Student = this.studentList.find((s) => {
      console.log(`the sid is ${id} and id is ${id}`);
      return s.id === id;
    });
    console.log(currentStudent);

    this.stdService.setCurrentStudent(currentStudent as Student);
    // this.stdService.setCurrentStudent('Hello');

    this.router.navigateByUrl('/edit-student');
  }

  onClearData() {
    this.stdService.clearData().subscribe((data) => {
      this.fetchData();
    });
  }
}
