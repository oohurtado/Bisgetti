import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCommonService } from '../../../../services/business/user/user-common.service';
import { UserUpdatePersonalDataRequest } from '../../../../source/models/dtos/user/common/user-update-personal-data-request';
import { UserResponse } from '../../../../source/models/dtos/user/common/user-response';
import { Utils } from '../../../../source/utils';

@Component({
    selector: 'app-personal-data',
    templateUrl: './personal-data.component.html',
    styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent extends FormBase implements OnInit {
    
    _user!: UserResponse;
    _userId!: string|null;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,		
		private userCommonService: UserCommonService,
    ) {
        super(); 				
    }

    async ngOnInit() {
        this.setUrlParameters();
        await this.getDataAsync();
        await this.setupFormAsync();
    }

	setUrlParameters() {
        this.activatedRoute.params.subscribe(async params => {			
			this._userId = params['userId'];

			if (this._userId === undefined) {
				this._userId = null;
			}
		});	
    }

    async getDataAsync() {
		this._error = null;
        this._isLoading = true;
        await this.userCommonService
            .getPersonalDataAsync(this._userId)
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

        let model = new UserUpdatePersonalDataRequest(
			this._myForm?.controls['firstName'].value, 
			this._myForm?.controls['lastName'].value, 
			this._myForm?.controls['phoneNumber'].value,
        );

        this.userCommonService.updatePersonalData(model, this._userId)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = errorResponse;
				},
				next: (val) => {
					if (this._userId === null) {
						this.router.navigateByUrl('/home');
					} else {
						this.router.navigateByUrl('/administration/users');
					}					
				}
			});
	}
}
