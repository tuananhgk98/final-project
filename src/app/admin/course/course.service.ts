import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private storeService: StoreService,
    private http: HttpClient
  ) { }

  list(): Observable<any> {
    return this.http.get<any>('course');
  }

  create(body) : Observable<any>{
    return this.http.post<any>('course', body);
  }

  delete(courseId) : Observable<any>{
    return this.http.delete<any>(`course/${courseId}`);
  }

  listLesson(courseId : string) : Observable<any> {
    return this.http.get<any>(`course/lessonOfCourse/${courseId}`);
  }

  getLesson(lessonId : string) : Observable<any> {
    return this.http.get<any>(`course/lesson/${lessonId}`);
  }
}
