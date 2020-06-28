import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/admin/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  lessonList = [];
  course: any;
  loading: boolean;
  courseId: any;
  userId : string;
  user : any = [];
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private userService: UserService
  ) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.userId = this.storeService.getUserId;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.userService.get(this.userId).subscribe(payload => {
      if(payload.ok) this.user = payload.data;
    });
    this.courseService.listLesson(this.courseId).pipe(finalize(() => this.loading = false)).subscribe(
      payload => {
        if (payload.ok) {
          this.lessonList = payload.data;
        }
      }
    );
    this.courseService.list().subscribe(payload => {
      this.course = payload.data.find(course => course._id === this.courseId);
    });
  }

}
