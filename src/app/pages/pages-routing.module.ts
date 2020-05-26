import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//component
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [

      {
        path: 'course',
        loadChildren: () => import('./course/course.module')
          .then(m => m.CourseModule)
      },
      {
        path: '',
        redirectTo: 'course',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
