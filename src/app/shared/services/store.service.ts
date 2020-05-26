
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    constructor() { }


    get getUser() {
        return this.get('user');
    }

    get getUserId() {
        return this.get('user')._id;
    }

    get(key: string) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (_e) {
            return value;
        }
    }
}