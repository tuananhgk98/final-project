import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../components/dialog/dialog-confirm/dialog-confirm.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

constructor(
  public dialog: MatDialog
) { }

confirm(data: any, callback: (result: boolean) => void) {
  const dialogRef = this.dialog.open(DialogConfirmComponent, { maxWidth: '95vw', data });
  dialogRef.afterClosed().subscribe(callback);
}
}
