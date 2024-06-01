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

    get<T>(query: string) {
		return this.http.get<T>(`${this.url}${query}`);
	}

	post<T>(query: string, model: T) {
		return this.http.post(`${this.url}${query}`, model);
	}

	put<T>(query: string, model: T) {
		return this.http.put(`${this.url}${query}`, model);
	}

	delete(query: string) {
		return this.http.delete(`${this.url}${query}`);
	}
}
