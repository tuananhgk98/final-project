import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  courseId: string;
  course: any;
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.form = this.fb.group({
      tag: ['', Validators.required],
      name: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseService.list().pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if (payload.ok) {
        this.form.patchValue(payload.data.find(course => course._id === this.courseId));
      }
    });
  }

  submit() {
    this.loading = true;
    this.courseService.update(this.courseId, this.form.value).pipe(finalize(() => this.loading = false)).subscribe(payload => {
        if(payload.ok){
          this.snackBar.open('Cập nhật học thành công', 'Bỏ qua', { duration: 3000 });
          this.navigateToList();
        }
    });
  }

  clearValue(controlName) {
    this.form.get(controlName).reset();
  }

  navigateToList() {
    this.router.navigateByUrl('/admin/course');
  }


}
