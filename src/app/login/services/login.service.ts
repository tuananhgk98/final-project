import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { env } from '../../shared/environment/environment';
import { StoreService } from '../../shared/services/store.service';


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(
        private http: HttpClient,
        private storeService: StoreService
    ) { }

    user = new BehaviorSubject<object>(null);
    currentUser = this.user.asObservable();

    login(body: any): Observable<any> {
        return this.http.post<any>(`login`, body);
    }

    register(body: object): Observable<any> {
        return this.http.post(`login/register`, body);
    }

    sendUserInfo(userInfo: object) {
        this.user.next(userInfo);
    }
}