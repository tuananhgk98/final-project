import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LessonsComponent } from './components/course-detail/lessons/lessons.component';


@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent, LessonsComponent],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
