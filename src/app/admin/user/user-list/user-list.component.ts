import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading: boolean;
  displayedColumns: string[] = ['_no', 'action', 'id', 'name', 'email', 'phone', 'role'];
  dataSource: any;
  constructor(
    private userService: UserService,
    private dialogService : DialogService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.userService.list().pipe(finalize(() => this.loading = false)).subscribe(payload => {
      if(payload.ok){
        this.dataSource = new MatTableDataSource(payload.data);
      }
    });
    
  }

  delete(data : any){
    this.dialogService.confirm({
      title: 'Xoá khoá học',
      message: `Bạn có thực sự muốn xoá học viên ${data.name}?`,
      acceptBtn: 'Xoá',
    }, result => {
      if (result) {
        this.userService.delete(data._id).pipe(finalize(() => this.loading = false)).subscribe(data => {
          if (data.ok) {
            this.snackBar.open('Xoá học viên thành công', 'Bỏ qua', { duration: 3000 });
            this.loadData();
          }
        });
    }});
  }
}
