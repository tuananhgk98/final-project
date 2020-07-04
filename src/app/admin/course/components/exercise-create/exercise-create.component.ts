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

  addQuestion() {
    this.exArray.push(this.fb.group({
      _id: [Math.random().toString(36).substring(7)],
      question: [''],
      note: [''],
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

  updateIsCorrect(answerNumber : number){
    for(let i of [1, 2, 3, 4]){
      this.exArray.controls[0].get(`answer${i}.isCorrect`).patchValue(null);
    }
    this.exArray.controls[0].get(`answer${answerNumber}.isCorrect`).patchValue(true);
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

  submit() {
    this.courseService.createExercise(this.lessonId, this.exArray.value).subscribe(payload => {
      if(payload.ok){
      }
    });
  }

}
