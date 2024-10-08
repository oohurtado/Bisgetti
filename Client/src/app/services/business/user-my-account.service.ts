import { Injectable } from '@angular/core';
import { RequestService } from '../common/request.service';
import { UserResponse } from '../../source/models/dtos/entities/user-response';
import { UpdatePersonalDataRequest } from '../../source/models/dtos/users/personal-data/update-personal-data-request';
import { ChangePasswordRequest } from '../../source/models/dtos/users/password/change-password.request';
import { CreateOrUpdateAddressRequest } from '../../source/models/dtos/users/address/create-or-update-address-request';
import { UpdateAddressDefaultRequest } from '../../source/models/dtos/users/address/update-address-default-request';
import { PageData } from '../../source/models/common/page-data';
import { AddressResponse } from '../../source/models/dtos/entities/address-response';

@Injectable({
    providedIn: 'root'
})
export class UserMyAccountService {

    constructor(private requestService: RequestService) { }

	///////////////////
	// personal data //
	///////////////////

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

	//////////////
	// password //
	//////////////

	changePassword(model: ChangePasswordRequest) {
		return this.requestService.put(`/user/my-account/password`, model);
	}

	/////////////
	// address //
	/////////////

	getAddress(id: number) {	
		return this.requestService.get<AddressResponse>(`/user/my-account/addresses/${id}`);
	}

	getAddressAsync(id: number) : Promise<AddressResponse> {
		return new Promise((resolve, reject) => {
			this.getAddress(id)
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

	getAddressesByPage() {	
		return this.requestService.get<PageData<AddressResponse>>(`/user/my-account/addresses`);
	}

	getAddressesByPageAsync() : Promise<PageData<AddressResponse>> {
		return new Promise((resolve, reject) => {
			this.getAddressesByPage()
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

	createAddress(model: CreateOrUpdateAddressRequest) {
		return this.requestService.post(`/user/my-account/addresses`, model);
	}

	updateAddress(id: number, model: CreateOrUpdateAddressRequest) {
		return this.requestService.put(`/user/my-account/addresses/${id}`, model);
	}

	deleteAddress(id: number) {
		return this.requestService.delete(`/user/my-account/addresses/${id}`);
	}
	
	updateAddressDefault(id: number, model: UpdateAddressDefaultRequest) {
		return this.requestService.put(`/user/my-account/addresses/default/${id}`, model);
	}
}
