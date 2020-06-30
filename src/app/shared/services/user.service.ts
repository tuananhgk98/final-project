import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(public http: HttpClient) { }

    list(): Observable<any> {
        return this.http.get<any>('user');
    }

    get(userId: string): Observable<any> {
        return this.http.get<any>(`user/${userId}`)
    }

    forgotPwd(body) : Observable<any> {
        return this.http.put<any>('user/forgotPwd', body);
    }

    updateLearned(userId: string, body): Observable<any> {
        return this.http.put<any>(`user/learned/${userId}`, body);
    }
}