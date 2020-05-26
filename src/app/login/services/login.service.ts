import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    login(body: any): Observable<any> {
        return this.http.post<any>(`login/test`, body);
    }

    register(body: object): Observable<any> {
        return this.http.post(`${env.apiUrl}/register`, body);
    }
}