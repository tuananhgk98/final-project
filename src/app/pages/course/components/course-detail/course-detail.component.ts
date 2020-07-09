import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/admin/course/course.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, startWith, map } from 'rxjs/operators';
import { StoreService } from 'src/app/shared/services/store.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  userId: string;
  user: any = [];
  isTrueNextLessonId: string;
  currentLessonId: string;
  currentCourse: any;
  filteredOptions: any;
  searchControl: FormControl = new FormControl();
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


  change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
  }


  loadData() {
    this.loading = true;
    this.userService.get(this.userId).subscribe(payload => {
      if (payload.ok) this.user = payload.data;
    });
    // this.courseService.list().subscribe(payload => {
    //   this.course = payload.data.find(course => course._id === this.courseId);
    //   this.currentLessonId = this.storeService.getCurrentLessonId(this.course.num -1);
    // });
    // this.courseService.listLesson(this.courseId).pipe(finalize(() => this.loading = false)).subscribe(
    //   payload => {
    //     if (payload.ok) {
    //       this.lessonList = payload.data;
    //       const num = this.lessonList.find(lesson => lesson._id === this.currentLessonId).num;
    //       this.isTrueNextLessonId = this.lessonList.find(lesson => lesson.num -1 === num)._id;
    //     }
    //   }
    // );
    this.courseService.getCourseAndLesson(this.courseId).subscribe(payload => {
      if (payload.ok) {
        this.course = payload.data.course;
        this.lessonList = payload.data.lesson;
        this.currentLessonId = this.storeService.getCurrentLessonId(this.course.num - 1);
        const num = payload.data.lesson.find(lesson => lesson._id === this.currentLessonId).num;
        this.isTrueNextLessonId = payload.data.lesson.find(lesson => lesson.num - 1 === num)._id;
      }
    }, null, () => {
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.lessonList.filter(option => {
      this.change_alias(option.name).toLowerCase().includes(filterValue);
    });
  }
}
