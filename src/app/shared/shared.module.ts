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
@NgModule({
  declarations: [HeaderComponent, UserComponent, UserInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    HeaderComponent,
    UserComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]

})
export class SharedModule { }
