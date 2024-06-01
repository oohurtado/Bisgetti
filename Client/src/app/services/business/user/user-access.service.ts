import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { UserSignupRequest } from '../../../source/models/dtos/user/access/user-signup-request';
import { UserLoginRequest } from '../../../source/models/dtos/user/access/user-login-request';

@Injectable({
    providedIn: 'root'
})
export class UserAccessService {

    constructor(private requestService: RequestService) { }

    isEmailAvailable(email: string) {
		return this.requestService.get<any>(`/user/access/email-available/${email}`);
	}

	signup(model: UserSignupRequest) {
		return this.requestService.post('/user/access/signup', model);
	}

	login(model: UserLoginRequest) {
		return this.requestService.post('/user/access/login', model);
	}
}
