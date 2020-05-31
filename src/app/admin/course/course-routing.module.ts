import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';


const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: 'create',
    component: CourseCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
