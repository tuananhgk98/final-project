import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../course.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/shared/services/dialog.service';
@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {
  loading: boolean;
  dataSource: any;
  displayedColumns: string[] = ['_no', 'action', 'id', 'name', 'exNum'];
  courseId: string;
  course: any;
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialogService: DialogService
  ) {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.courseService.listLesson(this.courseId).pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if(payload.ok) {
        this.dataSource = new MatTableDataSource(payload.data);
      }
    });
    this.courseService.list().subscribe(payload => {
      if(payload.ok) {
        this.course = payload.data.find(course => course._id === this.courseId);
      }
    });
  }

  delete(data: any) {
    this.dialogService.confirm({
      title: 'Xoá khoá học',
      message: `Bạn có thực sự muốn xoá bài học ${data.name}?`,
      acceptBtn: 'Xoá',
    }, result => {
      if (result) {
        this.courseService.deleteLesson(data._id).pipe(finalize(() => this.loading = false)).subscribe(data => {
          if (data.ok) {
            this.snackBar.open('Xoá bài học thành công', 'Bỏ qua', { duration: 3000 });
            this.loadData();
          }
        });
      }
    });
  }

}
