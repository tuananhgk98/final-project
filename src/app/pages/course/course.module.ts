import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';


@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent],
  imports: [
    CommonModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
