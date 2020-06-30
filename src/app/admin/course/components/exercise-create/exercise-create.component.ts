import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseService } from '../../course.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {

  lessonId: string;
  loading: boolean;
  lesson: any;
  form: FormGroup;

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.lessonId = this.activatedRoute.snapshot.paramMap.get('lessonId');
    this.form = this.fb.group({
      exArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadData();
    if (!this.exArray.length) {
     this.addQuestion();
    }
  }

  addQuestion(){
    this.exArray.push(this.fb.group({
      question: [''],
      note : [''],
      answer1: this.fb.group({
        answer: ['', Validators.required],
        isCorrect: []
      }),
      answer2: this.fb.group({
        answer: ['', Validators.required],
        isCorrect: []
      }),
      answer3: this.fb.group({
        answer: ['', Validators.required],
        isCorrect: []
      }),
      answer4: this.fb.group({
        answer: ['', Validators.required],
        isCorrect: []
      })
    }));
  }

  public get exArray() {
    return this.form.get('exArray') as FormArray;
  }

  loadData() {
    this.courseService.getLesson(this.lessonId).pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if (payload.ok) {
        this.lesson = payload.data;
      }
    });
  }

  submit(){
    console.log(this.form.get('exArray').value);
  }

}
