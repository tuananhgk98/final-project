import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//component
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: ':id',
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
