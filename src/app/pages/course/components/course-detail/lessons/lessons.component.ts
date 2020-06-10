import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {
  lessonForm: FormGroup;
  isShow: boolean = false;
  editorOptions = { theme: 'vs-dark', language: 'javascript' };

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.lessonForm = this.formBuilder.group({
      code: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.lessonForm.get('code').patchValue('function doSomething() {\nconsole.log("Hello world!");\n}');
  }

  showTestCase() {
    this.isShow = true;
  }
  goBack() {
    this.isShow = false;
  }

  run() {
    console.log(this.lessonForm.value);
  }
}

