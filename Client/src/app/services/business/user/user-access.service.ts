import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { SignupRequest } from '../../../source/models/dtos/user/access/signup-request';
import { LoginRequest } from '../../../source/models/dtos/user/access/login-request';
import { PasswordRecoveryRequest } from '../../../source/models/dtos/user/access/password-recovery-request';
import { SetPasswordRequest } from '../../../source/models/dtos/user/access/set-password-request';

@Injectable({
    providedIn: 'root'
})
export class UserAccessService {

    constructor(private requestService: RequestService) { }

    isEmailAvailable(email: string) {
		return this.requestService.get<any>(`/user/access/email-available/${email}`);
	}

	signup(model: SignupRequest) {
		return this.requestService.post('/user/access/signup', model);
	}

	login(model: LoginRequest) {
		return this.requestService.post('/user/access/login', model);
	}

	passwordRecovery(model: PasswordRecoveryRequest) {
		return this.requestService.post('/user/access/password-recovery', model);
	}

	setPassword(model: SetPasswordRequest) {
		return this.requestService.post('/user/access/set-password', model);
	}
}
