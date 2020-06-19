import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CourseService } from '../../course.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      tag: ['', Validators.required],
      name: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  editorValue = '';
  form: FormGroup;
  loading: boolean;

  ngOnInit(): void {
  }

  clearValue(controlName) {
    this.form.get(controlName).reset();
  }

  submit() {
    this.loading = true;
    this.courseService.create(this.form.value).pipe(finalize(() => this.loading = false)).subscribe(data => {
      if (data.ok) {
        this.navigateToList();
        this.snackBar.open('Tạo mới khoá học thành công', 'Bỏ qua', { duration: 3000 });
      }
    });
  }

  navigateToList() {
    this.router.navigateByUrl('/admin/course');
  }

}
