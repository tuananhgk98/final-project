//Angular module
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { UserComponent } from '../shared/components/user/user.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DialogConfirmComponent } from './components/dialog/dialog-confirm/dialog-confirm.component';
@NgModule({
  declarations: [HeaderComponent, UserComponent, UserInfoComponent, AdminHeaderComponent, LoadingComponent, DialogConfirmComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents : [DialogConfirmComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    HeaderComponent,
    UserComponent,
    AdminHeaderComponent,
    RouterModule,
    LoadingComponent,
    DialogConfirmComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class SharedModule { }
