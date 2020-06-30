import { NgModule, Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { DomSanitizer } from "@angular/platform-browser";
import { CKEditorModule } from "ngx-ckeditor";

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LessonCreateComponent } from './components/lesson-create/lesson-create.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ExerciseCreateComponent } from './components/exercise-create/exercise-create.component';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [CourseListComponent, CourseCreateComponent, SafeHtmlPipe, LessonCreateComponent, LessonListComponent, LessonDetailComponent, CourseDetailComponent, ExerciseCreateComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    MaterialModule,
    CKEditorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CourseModule { }
