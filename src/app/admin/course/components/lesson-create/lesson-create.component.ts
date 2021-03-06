import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.scss']
})
export class LessonCreateComponent implements OnInit {

  form: FormGroup;
  courseId: string;
  loading: boolean;
  course: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: [''],
      content: [''],
      youtubeUrl: [''],
      exercise: this.fb.array([]),
      courseId: ['']
    });
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.form.get('courseId').patchValue(this.courseId);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courseService.list().pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if (payload.ok) {
        this.course = payload.data.find(course => course._id === this.courseId);
      }
    });
  }

  submit() {
    this.loading = true;
    this.courseService.createLesson(this.form.value).pipe(finalize(() => this.loading = false)).subscribe((payload: any) => {
      if (payload.ok) {
        this.snackBar.open('Tạo bài học thành công', 'Bỏ qua', { duration: 3000 });
        this.router.navigateByUrl(`/admin/course/${this.courseId}/lesson`);
      }
    });
  }

  navigateToList() {
    this.router.navigateByUrl(`/admin/course/${this.courseId}/lesson`);
  }

}
