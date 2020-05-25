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

    private login(body: object): Observable<any> {
        return this.http.post(`${env.apiUrl}/user/login`, body);
    }

    private register(body: object): Observable<any> {
        return this.http.post(`${env.apiUrl}/register`, body);
    }
}