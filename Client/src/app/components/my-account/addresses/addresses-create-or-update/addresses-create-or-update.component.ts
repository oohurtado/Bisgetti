import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tuple2 } from '../../../../source/models/common/tuple';
import { UserMyAccountService } from '../../../../services/business/user-my-account.service';
import { AddressResponse } from '../../../../source/models/business/address-response';
import { CreateOrUpdateAddressRequest } from '../../../../source/models/dtos/users/address/create-or-update-address-request';
import { Utils } from '../../../../source/utils';
import { ListFactory } from '../../../../source/factories/list-factory';
declare let alertify: any;

@Component({
    selector: 'app-addresses-create-or-update',
    templateUrl: './addresses-create-or-update.component.html',
    styleUrl: './addresses-create-or-update.component.css'
})
export class AddressesCreateOrUpdateComponent extends FormBase implements OnInit {

    _addressId!: number;
    _address!: AddressResponse;

    _countries: Tuple2<string,string>[] = [];
    _states: Tuple2<string,string>[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
        private userMyAccountService: UserMyAccountService
    ) {
        super();
    }

    async ngOnInit() {
        this.setLists();        
        await this.setUrlParametersAsync();
    }

    async setUrlParametersAsync() {
        this.activatedRoute.params.subscribe(async params => {			
			this._addressId = params['id'];
            if (this._addressId !== null && this._addressId !== undefined) {
                await this.getDataAsync(this._addressId);
            }
            await this.setupFormAsync();
		});	
    }

    async getDataAsync(id: number) {
		this._error = null;
        this._isLoading = true;
        await this.userMyAccountService
            .getAddressAsync(id)
            .then(p => {
				this._address = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
        this._isLoading = false;
    }

    override setupFormAsync() {
        if (this._address === null || this._address === undefined) {
            this._myForm = this.formBuilder.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                country: [null, [Validators.required]],
                state: [null, [Validators.required]],
                city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],   
                suburb: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],            
                postalCode: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                exteriorNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                interiorNumber: ['', [Validators.maxLength(10)]],
                moreInstructions: ['', [Validators.maxLength(250)]],
                phoneNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
            });

            this._myForm.get('country')?.setValue("México");
        } else {
            this._myForm = this.formBuilder.group({
                name: [this._address.name, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
                country: [null, [Validators.required]],
                state: [null, [Validators.required]],
                city: [this._address.city, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                suburb: [this._address.suburb, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                postalCode: [this._address.postalCode, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                street: [this._address.street, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                exteriorNumber: [this._address.exteriorNumber, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
                interiorNumber: [this._address.interiorNumber, [Validators.maxLength(10)]],
                moreInstructions: [this._address.moreInstructions, [Validators.maxLength(250)]],
                phoneNumber: [this._address.phoneNumber, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
            });

            this._myForm.get('country')?.setValue(this._address.country);
            this._myForm.get('state')?.setValue(this._address.state);
        }
    }

    onDoneClicked() {

		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new CreateOrUpdateAddressRequest(
            this._myForm?.controls['name'].value, 
            this._myForm?.controls['country'].value, 
            this._myForm?.controls['state'].value,
            this._myForm?.controls['city'].value,
            this._myForm?.controls['suburb'].value,
            this._myForm?.controls['street'].value,
            this._myForm?.controls['exteriorNumber'].value,
            this._myForm?.controls['interiorNumber'].value,
            this._myForm?.controls['postalCode'].value,
            this._myForm?.controls['moreInstructions'].value,
            this._myForm?.controls['phoneNumber'].value,
            );

        if (this._addressId === null || this._addressId === undefined) {
            this.userMyAccountService.createAddress(model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('my-account/addresses/list');
                        alertify.message("Dirección creada", 1)
                    }
                });
        }   
        else {
            this.userMyAccountService.updateAddress(this._addressId, model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('my-account/addresses/list');
                        alertify.message("Cambios guardados", 1)
                    }
                });
        }         
    }

    setLists() {
        // paises
        this._countries = ListFactory.get("my-account-address-countries");

        // estados
        this._states = ListFactory.get("my-account-address-states");
    }
}
