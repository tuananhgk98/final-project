import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  form: FormGroup;
  courseId: string;
  loading: boolean;
  lessonId: string;
  course: any;
  updating : boolean;
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
    this.lessonId = this.activatedRoute.snapshot.paramMap.get('lessonId');
    this.form.get('courseId').patchValue(this.courseId);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courseService.listLesson(this.courseId).pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if (payload.ok) {
        this.form.patchValue(payload.data.find(lesson => lesson._id === this.lessonId));
      }
    })
  }

  submit() {
    this.updating = true;
    this.courseService.updateLesson(this.lessonId, this.form.value).pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if(payload.ok){
        this.snackBar.open('Cập nhân học thành công', 'Bỏ qua', { duration: 3000 });
        this.navigateToList();
      }
    });
  }

  navigateToList() {
    this.router.navigateByUrl(`/admin/course/${this.courseId}/lesson`);
  }

}
