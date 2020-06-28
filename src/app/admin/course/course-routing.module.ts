import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonCreateComponent } from './components/lesson-create/lesson-create.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';


const routes: Routes = [
  {
    path: '',
    component: CourseListComponent
  },
  {
    path: '/:courseId',
    component: CourseDetailComponent
  },
  {
    path: 'create',
    component: CourseCreateComponent
  },
  {
    path : ':courseId/lesson',
    component: LessonListComponent
  },
  {
    path : ':courseId/lesson-create',
    component: LessonCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
