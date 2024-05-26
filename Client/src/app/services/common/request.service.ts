import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { general } from '../../source/general';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestService {


	private url: string = general.URL_API;
	private token!: string;

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { 
        this.token = localStorageService.getValue(general.LS_TOKEN)!;
    }

    get<T>(query: string, secure: boolean = false) {
		if (!secure) {
			return this.http.get<T>(`${this.url}${query}`);
		}

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.token}`
		});

		return this.http.get<T>(`${this.url}${query}`, { headers });
	}

	post<T>(query: string, model: T, secure: boolean = false) {
		if (!secure) {
			return this.http.post(`${this.url}${query}`, model);
		}

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.token}`
		});

		return this.http.post(`${this.url}${query}`, model, { headers });
	}

	put<T>(query: string, model: T, secure: boolean = false) {
		if (!secure) {
			return this.http.put(`${this.url}${query}`, model);
		}

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.token}`
		});

		return this.http.put(`${this.url}${query}`, model, { headers });
	}

	delete(query: string, secure: boolean = false) {
		if (!secure) {
			return this.http.delete(`${this.url}${query}`);
		}

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.token}`
		});

		return this.http.delete(`${this.url}${query}`, { headers });
	}
}