import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/admin/course/course.service';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList = [];
  loading: boolean;
  user: any;
  currentCourseId: string;
  currentCourse: any;
  currentLearnedCourse: any;
  isTrueNextCourseId: string;
  constructor(
    private courseService: CourseService,
    private userService: UserService,
    private storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.loading = true;
    this.courseService.list().pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if (payload.ok) this.courseList = payload.data;
      this.userService.get(this.storeService.getUserId).subscribe(payload1 => {
        if (payload1.ok) {
          this.user = payload1.data;
          if (this.user.learned.length === 0) {
            this.currentCourseId = this.courseList[0]._id;
            this.user.learned.push({
              courseId: this.currentCourseId,
              lesson: []
            });
            this.userService.updateLearned(this.user._id, this.user.learned).subscribe(payload2 => {
              if (payload2.ok) {
                this.storeService.set('user', payload2.data);
              }
            });
          }
          else {
            this.currentCourseId = this.user.learned[this.user.learned.length - 1].courseId;
          }
          this.currentCourse = this.courseList.find(course => course._id === this.currentCourseId);
          console.log(this.currentCourse);
          this.currentLearnedCourse = this.user.learned.find(course => course.courseId === this.currentCourseId);
          console.log(this.currentLearnedCourse);
          const currentCourseNum = this.currentCourse.num;
          this.isTrueNextCourseId = this.courseList.find(course => course.num - 1 === currentCourseNum)._id;
        }
      });
    });

  }

  getCourseInLearned(courseId: string) {
        return this.user.learned.find(i => i.courseId === courseId);
  }

  getCourse(courseId: string){
    return this.courseList.find(i => i._id === courseId);
  }

  joinCourse(courseId: string) {
    if (this.user.learned.find(data => data.courseId === courseId) === undefined) {
      this.user.learned.push({
        courseId: courseId,
        lesson: []
      });
      this.userService.updateLearned(this.user._id, this.user.learned).subscribe((payload) => {
        if (payload.ok) {
          this.storeService.set('user', payload.data);
          this.router.navigateByUrl(`/pages/course/${courseId}`);
        }
      });
    }
    else {
      this.router.navigateByUrl(`/pages/course/${courseId}`);
    }
  }

}
