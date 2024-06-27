import { Component, OnInit } from '@angular/core';
import { PageBase } from '../../../../source/page-base';
import { AddressResponse } from '../../../../source/models/business/address-response';
import { INavigationOptionSelected } from '../../../../source/models/interfaces/page.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { UserMyAccountService } from '../../../../services/business/user-my-account.service';
import { Utils } from '../../../../source/utils';
import { UpdateAddressDefaultRequest } from '../../../../source/models/dtos/users/address/update-address-default-request';
declare let alertify: any;

@Component({
    selector: 'app-addresses-list',
    templateUrl: './addresses-list.component.html',
    styleUrl: './addresses-list.component.css'
})
export class AddressesListComponent extends PageBase<AddressResponse> implements OnInit {

    constructor(
        private router: Router,
		localStorageService: LocalStorageService,
        private userMyAccountService: UserMyAccountService
    ) {
        super(null, localStorageService)
    }
    
    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;
		await this.userMyAccountService
			.getAddressesByPageAsync()
			.then(p => {				
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
		this._isProcessing = false;
    }

	onCreateClicked(event: Event) {
		let button = event.target as HTMLButtonElement;
        button.blur();
		this.router.navigateByUrl('/my-account/addresses/create');
	}

	onUpdateClicked(event: Event, address: AddressResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();
		this.router.navigateByUrl(`/my-account/addresses/update/${address.id}`);
	}
	
	onDeleteClicked(event: Event, address: AddressResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar la dirección: <b>${address.name}</b>?
			<br>
			<small><strong>Ten en cuenta lo siguiente:</strong> Los envíos en curso no serán cancelados, y el historial de tus compras permanecerá igual.</small>
			`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component._isProcessing = true;
				component.userMyAccountService.deleteAddress(address.id)
					.subscribe({
						complete: () => {
							component._isProcessing = false;
						},
						error: (e : string) => {
							component._isProcessing = false;
							component._error = Utils.getErrorsResponse(e);					
						},
						next: (val) => {							
							component._pageData.data = component._pageData.data.filter(p => p.id != address.id);
							alertify.message("Dirección borrada", 1)
						}
					});				
			},
			function () {
				// ...
			});		
	}

	onDefaultClicked(event: Event, address: AddressResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		this._isProcessing = true;

		let model = new UpdateAddressDefaultRequest(!address.isDefault)
		this.userMyAccountService.updateAddressDefault(address.id, model)
		.subscribe({
			complete: () => {
				this._isProcessing = false;
			},
			error: (e : string) => {
				this._isProcessing = false;
				this._error = Utils.getErrorsResponse(e);					
			},
			next: (val) => {
				if (model.isDefault) {					
					this._pageData.data
						.filter(p => p.id != address.id && p.isDefault)
						.forEach(p => {
							p.isDefault = false
						});
				}
				this._pageData.data.filter(p => p.id == address.id)[0].isDefault = !address.isDefault;
				alertify.message("Cambios guardados", 1)
			}
		});
	}
}
