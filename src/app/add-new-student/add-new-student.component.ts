import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.component.html',
  styleUrls: ['./add-new-student.component.css'],
})
export class AddNewStudentComponent implements OnInit {


  constructor(private stdService: StudentService, private router: Router) {}

  ngOnInit() {
    // this.nextID = this.stdService.getNextID();
  }

  onSubmit(newStudent: { sName: string; sAge: string }) {
    console.log(newStudent);
    const student: Student = {
      name: newStudent.sName,
      age: Number(newStudent.sAge),
    };
    this.stdService.addStudent(student).subscribe((data) => console.log(data));
    this.stdService.getStudents().subscribe();
    this.router.navigateByUrl('/student-list');
  }

  //   // this.stdService
  //   //   .addStudent(newStudent)
  //   //   .subscribe((data) => console.log(data));

  //   this.stdService.getStudents().subscribe();
  // // }
}
