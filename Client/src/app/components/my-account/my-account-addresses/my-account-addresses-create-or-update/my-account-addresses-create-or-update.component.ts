import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tuple2 } from '../../../../source/models/common/tuple';
import { UserMyAccountService } from '../../../../services/business/user/user-my-account.service';
import { AddressResponse } from '../../../../source/models/business/address-response';
import { CreateOrUpdateAddressRequest } from '../../../../source/models/dtos/user/my-account/address/create-or-update-address-request';
import { Utils } from '../../../../source/utils';

@Component({
    selector: 'app-my-account-addresses-create-or-update',
    templateUrl: './my-account-addresses-create-or-update.component.html',
    styleUrl: './my-account-addresses-create-or-update.component.css'
})
export class MyAccountAddressesCreateOrUpdateComponent extends FormBase implements OnInit {

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
        this.setUrlParameters();
    }

    setUrlParameters() {
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
                    error: (errorResponse : string) => {
                        this._isProcessing = false;
                        this._error = errorResponse;
                    },
                    next: (val) => {
                        this.router.navigateByUrl('my-account/addresses/list');
                    }
                });
        }   
        else {
            this.userMyAccountService.updateAddress(this._addressId, model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (errorResponse : string) => {
                        this._isProcessing = false;
                        this._error = errorResponse;
                    },
                    next: (val) => {
                        this.router.navigateByUrl('my-account/addresses/list');
                    }
                });
        }         





        // this.userAdministrationService.createUser(model)
		// 	.subscribe({
		// 		complete: () => {
		// 			this._isProcessing = false;
		// 		},
		// 		error: (errorResponse : string) => {
		// 			this._isProcessing = false;
		// 			this._error = errorResponse;
		// 		},
		// 		next: (val) => {
		// 			this.router.navigateByUrl('/administration/users');
		// 		}
		// 	});

    }

    setLists() {
        // paises
        this._countries.push(new Tuple2("México", "México"));

        // estados
        this._states.push(new Tuple2("Aguascalientes", "Aguascalientes"));
        this._states.push(new Tuple2("Baja California", "Baja California"));
        this._states.push(new Tuple2("Baja California Sur", "Baja California Sur"));
        this._states.push(new Tuple2("Campeche", "Campeche"));
        this._states.push(new Tuple2("Chiapas", "Chiapas"));
        this._states.push(new Tuple2("Chihuahua", "Chihuahua"));
        this._states.push(new Tuple2("Ciudad de México", "Ciudad de México"));
        this._states.push(new Tuple2("Coahuila", "Coahuila"));
        this._states.push(new Tuple2("Colima", "Colima"));
        this._states.push(new Tuple2("Durango", "Durango"));
        this._states.push(new Tuple2("Guanajuato", "Guanajuato"));
        this._states.push(new Tuple2("Guerrero", "Guerrero"));
        this._states.push(new Tuple2("Hidalgo", "Hidalgo"));
        this._states.push(new Tuple2("Jalisco", "Jalisco"));
        this._states.push(new Tuple2("Estadi de México", "Estadi de México"));
        this._states.push(new Tuple2("Michoacán", "Michoacán"));
        this._states.push(new Tuple2("Morelos", "Morelos"));
        this._states.push(new Tuple2("Nayarit", "Nayarit"));
        this._states.push(new Tuple2("Nuevo León", "Nuevo León"));
        this._states.push(new Tuple2("Oaxaca", "Oaxaca"));
        this._states.push(new Tuple2("Puebla", "Puebla"));
        this._states.push(new Tuple2("Querétaro", "Querétaro"));
        this._states.push(new Tuple2("Quintana Roo", "Quintana Roo"));
        this._states.push(new Tuple2("San Luis Potosí", "San Luis Potosí"));
        this._states.push(new Tuple2("Sinaloa", "Sinaloa"));
        this._states.push(new Tuple2("Sonora", "Sonora"));
        this._states.push(new Tuple2("Tabasco", "Tabasco"));
        this._states.push(new Tuple2("Tamaulipas", "Tamaulipas"));
        this._states.push(new Tuple2("Tlaxcala", "Tlaxcala"));
        this._states.push(new Tuple2("Veracruz", "Veracruz"));
        this._states.push(new Tuple2("Yucatán", "Yucatán"));
        this._states.push(new Tuple2("Zacatecas", "Zacatecas"));
    }
}
