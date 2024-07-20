import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserMyAccountService } from '../../../services/business/user-my-account.service';
import { UpdatePersonalDataRequest } from '../../../source/models/dtos/users/personal-data/update-personal-data-request';
import { UserResponse } from '../../../source/models/business/responses/user-response';
import { Utils } from '../../../source/utils';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { general } from '../../../source/general';
declare let alertify: any;

@Component({
    selector: 'app-update-personal-data',
    templateUrl: './update-personal-data.component.html',
    styleUrl: './update-personal-data.component.css'
})
export class UpdatePersonalDataComponent extends FormBase implements OnInit {
    
    _user: UserResponse|null = null;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,		
		private userMyAccountService: UserMyAccountService,
		private localStorageService: LocalStorageService
    ) {
        super(); 				
    }

    async ngOnInit() {        
        await this.getDataAsync();
        await this.setupFormAsync();
    }

    async getDataAsync() {
		this._error = null;
        this._isLoading = true;
        await this.userMyAccountService
            .getPersonalDataAsync()
            .then(p => {
				this._user = p;
                this._isLoading = false;
			})
			.catch(e => {
                this._error = Utils.getErrorsResponse(e);	
				this._isLoading = false;
			});
    }

    override setupFormAsync(): void {
		if (this._user === null) {
			return;
		}

		this._myForm = this.formBuilder.group({
			firstName: [this._user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			lastName: [this._user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			phoneNumber: [this._user.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
		});
    }

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new UpdatePersonalDataRequest(
			this._myForm?.controls['firstName'].value, 
			this._myForm?.controls['lastName'].value, 
			this._myForm?.controls['phoneNumber'].value,
        );

        this.userMyAccountService.updatePersonalData(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);;
				},
				next: (val) => {
					this.router.navigateByUrl('/my-account');
					alertify.message("Cambios guardados", 1);

					this.localStorageService.setValue(general.LS_FIRST_NAME, model.firstName);
					this.localStorageService.setValue(general.LS_LAST_NAME, model.lastName);
				}
			});
	}
}
