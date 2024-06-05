import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { UserResponse } from '../../../source/models/dtos/user/my-account/user-response';
import { UpdatePersonalDataRequest } from '../../../source/models/dtos/user/my-account/update-personal-data-request';
import { ChangePasswordRequest } from '../../../source/models/dtos/user/my-account/change-password.request';

@Injectable({
    providedIn: 'root'
})
export class UserMyAccountService {

    constructor(private requestService: RequestService) { }

    getPersonalData() {
		return this.requestService.get<UserResponse>(`/user/my-account/personal-data`);
    }

    getPersonalDataAsync() : Promise<UserResponse> {
		return new Promise((resolve, reject) => {
			this.getPersonalData()
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

    updatePersonalData(model: UpdatePersonalDataRequest) {
		return this.requestService.put(`/user/my-account/personal-data`, model);
	}

	changePassword(model: ChangePasswordRequest) {
		return this.requestService.put(`/user/my-account/password`, model);
	}
}
