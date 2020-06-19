import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-create',
  templateUrl: './lesson-create.component.html',
  styleUrls: ['./lesson-create.component.scss']
})
export class LessonCreateComponent implements OnInit {

form : FormGroup;
courseId : string;

  constructor(
    private fb : FormBuilder,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {
    this.form = this.fb.group({});
    this.courseId = this.activatedRoute.snapshot['courseID'];
   }

  ngOnInit(): void {
    console.log(this.courseId);
  }

  submit(){

  }

  navigateToList(){
    this.router.navigateByUrl(`/admin/course/${this.courseId}/lesson`);
  }

}
