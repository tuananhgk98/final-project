import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/admin/course/course.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList = [];
  loading : boolean;
  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.courseService.list().pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if(payload.ok) this.courseList = payload.data;
    }); 
  }

}
