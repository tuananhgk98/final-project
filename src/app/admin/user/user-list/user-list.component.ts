import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  loading: boolean;
  displayedColumns: string[] = ['_no', 'action', 'id', 'name', 'email'];
  dataSource: any;
  constructor(
    private userService: UserService
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

}
