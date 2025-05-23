import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { general } from '../../source/common/general';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	constructor(private jwtHelper: JwtHelperService) {
	}

	// guarda en local storage
	setValue(key: string, value: string) {
		if (typeof (Storage) !== "undefined") {
			localStorage.setItem(key, value);
		}
		else {
			console.error('localStorage not supported');
		}
	}

	// obtiene de local storage
	getValue(key: string) {
		if (typeof (Storage) !== "undefined") {
			return localStorage.getItem(key);
		}
		else {
			console.error('localStorage not supported');
			return null;
		}
	}

	clean() {
		localStorage.clear();
	}

	///////////
	/* roles */
	///////////

	isUserAuthenticated() {
		let token = this.getValue(general.LS_TOKEN);
		return token && !this.jwtHelper.isTokenExpired(token);
	}	

	isUserAnon() {
		return !this.isUserAuthenticated();
	}

	isUserAdmin() {
		return this.isUserAuthenticated() && this.isUserInRole(general.LS_ROLE_USER_ADMIN);
	}

	isUserBoss() {
		return this.isUserAuthenticated() && this.isUserInRole(general.LS_ROLE_USER_BOSS);
	}

	isUserCustomer() {
		return this.isUserAuthenticated() && this.isUserInRole(general.LS_ROLE_USER_CUSTOMER);
	}

	isUserChef() {
		return this.isUserAuthenticated() && this.isUserInRole(general.LS_ROLE_USER_CHEF);
	}

	isUserInRole(role: string): boolean {
		let token = this.getValue(general.LS_TOKEN);
		let decodedToken = this.jwtHelper.decodeToken(token!);
		let decodedRole = decodedToken[general.MS_ROLE]

		let isArray = Array.isArray(decodedRole);
		if (isArray) {
			let array = decodedRole as string[];
			let newArr = array.filter(p => p === role);
			return newArr.length == 1;
		} else {
			return decodedRole === role;
		}
	}

	isUserInAnyRole(roles: string[]) {
		let inRole = false;

		roles.forEach(p => {
			if (this.isUserInRole(p)) {
				inRole = true;
				return;
			}			
		});

		return inRole;
	}
	
	getUserId(): string {
		return this.getDataFromToken(general.MS_ID);		
	}

	getUserRole(): string {
		return this.getDataFromToken(general.MS_ROLE);		
	}

	getUserEmail(): string {
		return this.getValue(general.LS_USER_EMAIL_ADDRESS)!;
	}

	getUserFirstName(): string {
		return this.getValue(general.LS_USER_FIRST_NAME)!;
	}

	getUserLastName(): string {
		return this.getValue(general.LS_USER_LAST_NAME)!;
	}

	getUserFullName(): string {
		return `${this.getUserFirstName()} ${this.getUserLastName()}`
	}

	getDataFromToken(tag: string): string {
		let token = this.getValue(general.LS_TOKEN);
		let decodedToken = this.jwtHelper.decodeToken(token!);
		let decodedRole = decodedToken[tag]
		return decodedRole;
	}

	//////////
	/* page */
	//////////
	
	getPageSize(): number {
		let pageSize = this.getValue(general.LS_PAGE_SIZE);
		return pageSize === null ? 10 : Number(pageSize);
	}

	setPageSize(pageSize: number) {
		this.setValue(general.LS_PAGE_SIZE, pageSize.toString());
	}
}
