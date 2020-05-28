import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { LessonsComponent } from './components/course-detail/lessons/lessons.component';
import { FormsModule } from '@angular/forms';
// import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
@NgModule({
  declarations: [CourseListComponent, CourseDetailComponent, LessonsComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    // MonacoEditorModule,
    MonacoEditorModule.forRoot()
  ],
  // providers: [
  //   {
  //     provide: MONACO_PATH,
  //     useValue: 'https://unpkg.com/monaco-editor@0.19.3/min/vs'
  //   }
  // ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CourseModule { }
