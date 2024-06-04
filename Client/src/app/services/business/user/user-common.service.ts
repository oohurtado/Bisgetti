import { Injectable } from '@angular/core';
import { RequestService } from '../../common/request.service';
import { UserResponse } from '../../../source/models/dtos/user/common/user-response';
import { UpdatePersonalDataRequest } from '../../../source/models/dtos/user/common/update-personal-data-request';

@Injectable({
    providedIn: 'root'
})
export class UserCommonService {

    constructor(private requestService: RequestService) { }

    getPersonalData(userId: string|null) {
		if (userId === null) {
			userId = '';
		}
		return this.requestService.get<UserResponse>(`/user/common/personal-data?userId=${userId}`);
    }

    getPersonalDataAsync(userId: string|null) : Promise<UserResponse> {
		return new Promise((resolve, reject) => {
			this.getPersonalData(userId)
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

    updatePersonalData(model: UpdatePersonalDataRequest, userId: string|null) {
		if (userId === null) {
			userId = '';
		}
		return this.requestService.put(`/user/common/personal-data?userId=${userId}`, model);
	}
}
