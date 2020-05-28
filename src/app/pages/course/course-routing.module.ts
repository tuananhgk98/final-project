import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//component
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LessonsComponent } from "./components/course-detail/lessons/lessons.component";

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: ':id',
    component: CourseDetailComponent,
  },
  {
    path: ':id/lesson/:lessonId',
    component: LessonsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
