import { NgModule, Pipe, PipeTransform, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CourseRoutingModule } from './course-routing.module';
import { DomSanitizer } from "@angular/platform-browser";
import { CKEditorModule } from "ngx-ckeditor";

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@NgModule({
  declarations: [CourseListComponent, CourseCreateComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule,
    CKEditorModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class CourseModule { }
