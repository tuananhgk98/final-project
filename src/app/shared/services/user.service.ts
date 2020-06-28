import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {
      constructor(public http : HttpClient){}

      get(userId : string) : Observable<any>{
          return this.http.get<any>(`user/${userId}`)
      }
  }