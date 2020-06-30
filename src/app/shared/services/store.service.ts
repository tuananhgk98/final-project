
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StoreService {
    constructor() { }

    user = new BehaviorSubject<object>(null);

    get getUser() {
        return this.get('user');
    }

    get getUserId() {
        return this.get('user')._id;
    }

    get getCurrentLessonId() {
        return this.get('user').learned.lesson[this.get('user').learned.lesson.length - 1];
    }

    get(key: string) {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value);
        } catch (_e) {
            return value;
        }
    }

    set(key: string, object: object) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }
}