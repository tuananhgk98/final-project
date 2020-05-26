import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      url: `http://localhost:3000/${req.url}`,
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request);
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
