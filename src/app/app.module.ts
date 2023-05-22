import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AddNewStudentComponent } from './add-new-student/add-new-student.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/student-list', pathMatch: 'full' },
  { path: 'student-list', component: StudentListComponent },
  { path: 'add-student', component: AddNewStudentComponent },
  { path: 'edit-student', component: EditStudentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    AddNewStudentComponent,
    EditStudentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
