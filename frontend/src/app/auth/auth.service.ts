
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = "http://localhost:3000";
    constructor(private http: HttpClient) { }
    register(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(user: { email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user);
    }

    logout(): void {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    }

    isLoggedIn(): boolean {
        return !!sessionStorage.getItem('token');
    }

    getToken(): string | null {
        return sessionStorage.getItem('token');
    }

    getUserId(): string | null {
        return sessionStorage.getItem('userId');
    }
}