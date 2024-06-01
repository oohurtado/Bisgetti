import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccessService } from '../../../services/business/user/user-access.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { UserLoginRequest } from '../../../source/models/dtos/user/access/user-login-request';
import { UserTokenResponse } from '../../../source/models/dtos/user/access/user-token-response';
import { Utils } from '../../../source/utils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent extends FormBase implements OnInit {
    
    constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private localStorageService: LocalStorageService,
		private userAccessService: UserAccessService
    ) {
        super();        
    }

	async ngOnInit() {
		this.setupFormAsync();
	}

	override setupFormAsync(): void {
		this.setupForm();
	}

    setupForm() {
		this._myForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(100)]],
			password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
		},);
	}

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;
		let model = new UserLoginRequest(
			this._myForm?.controls['email'].value, 
			this._myForm?.controls['password'].value);

		this.userAccessService.login(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(errorResponse);					
				},
				next: (val) => {
					let model = Object.assign(new UserTokenResponse(), val);
					this.localStorageService.setValue('token', model.token);
					this.router.navigateByUrl('/home');
				}
			});
	}
}
