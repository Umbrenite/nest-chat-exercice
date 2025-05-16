
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = "http://localhost:3000";
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    isLoggedIn$ = this.loggedIn.asObservable();

    private hasToken(): boolean {
        return typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem('token');
    }

    constructor(private http: HttpClient) { }
    register(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(user: { email: string; password: string }): Observable<any> {
        this.loggedIn.next(true);
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    isLoggedIn(): boolean {
        return sessionStorage.length > 0;
    }

    getToken(): string | null {
        return sessionStorage.getItem('token');
    }
}