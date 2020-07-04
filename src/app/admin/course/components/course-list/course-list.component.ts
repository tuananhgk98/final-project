import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from '../../course.service';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserService } from 'src/app/shared/services/user.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private userService: UserService,
    private storeService: StoreService
  ) {

  }
  loading: boolean;
  displayedColumns: string[] = ['_no', 'action', 'id', 'name', 'lessonNum'];
  dataSource: any;
  currentCourseId: string;
  user: any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.courseService.list().pipe(finalize(() => this.loading = false)).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.data);
    });
  }

  delete(data: any) {
    this.dialogService.confirm({
      title: 'Xoá khoá học',
      message: `Bạn có thực sự muốn xoá khoá học ${data.name}?`,
      acceptBtn: 'Xoá',
    }, result => {
      if (result) {
        this.courseService.delete(data._id).pipe(finalize(() => this.loading = false)).subscribe(data => {
          if (data.ok) {
            this.snackBar.open('Xoá khoá học thành công', 'Bỏ qua', { duration: 3000 });
            this.loadData();
          }
        });
      }
    });
  }

}
