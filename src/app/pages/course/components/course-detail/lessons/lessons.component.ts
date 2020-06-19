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
  testCase = [
    {
      case: 'main(15)',
      expected: 39
    },
    {
      case: 'main(30)',
      expected: 54
    }
  ];

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

  }

  execute(functionText: string, testCase: any[]) {
    console.clear();
    testCase.map(item => {
      const result = eval(functionText + item.case);
      if (result === item.expected) {
        console.log('Case' + item.case + 'has resolve');
      }
    });
  }

}

