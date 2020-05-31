import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';

@NgModule({
  declarations: [CourseListComponent, CourseCreateComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CourseModule { }
