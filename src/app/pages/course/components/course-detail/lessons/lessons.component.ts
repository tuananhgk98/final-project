import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from 'src/app/admin/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})

export class LessonsComponent implements OnInit {
  lessonForm: FormGroup;
  isShow: boolean = false;
  lesson: any;
  course: any;
  lessonId: string;
  courseId: string;
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
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizationService
  ) {
    this.lessonForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
    this.lessonId = this.activatedRoute.snapshot.paramMap.get('lessonId');
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
  }

  ngOnInit(): void {
    this.loadData();
    this.lessonForm.get('code').patchValue('function doSomething() {\nconsole.log("Hello world!");\n}');
  }

  loadData() {
    this.courseService.getLesson(this.lessonId).subscribe(payload => {
      if (payload.ok) this.lesson = payload.data;
    });
    this.courseService.list().subscribe(payload => {
      if (payload.ok) {
        this.course = payload.data.find(course => course._id === this.courseId);
      }
    })
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

