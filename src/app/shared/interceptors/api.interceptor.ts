import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor(
    private router : Router
   ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    !token && this.router.navigateByUrl('/login');
    const request = req.clone({
      url: `http://192.168.1.33/spacrm/${req.url}`,
      // url: `http://civieserver-env.h7rxnvnypm.ap-southeast-1.elasticbeanstalk.com/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: any) {
    let errorMessage = '';

    if (error.status == 401) {
      errorMessage = 'Bạn không có quyền thực hiện chức năng này';
    }
    else if (error.status == 500) {
      errorMessage = 'Máy chủ hiện đang lỗi, vui lòng thử lại sau';
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
