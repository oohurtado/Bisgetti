import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCommonService } from '../../../../services/business/user/user-common.service';
import { UpdatePersonalDataRequest } from '../../../../source/models/dtos/user/common/update-personal-data-request';
import { UserResponse } from '../../../../source/models/dtos/user/common/user-response';
import { Utils } from '../../../../source/utils';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent extends FormBase implements OnInit {
    
    _user!: UserResponse;    
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,		
		private userCommonService: UserCommonService,
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
        await this.userCommonService
            .getPersonalDataAsync(null)
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

        this.userCommonService.updatePersonalData(model, null)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = errorResponse;
				},
				next: (val) => {
					this.router.navigateByUrl('/my-account');
				}
			});
	}
}
