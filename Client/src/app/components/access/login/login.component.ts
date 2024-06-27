import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { LoginRequest } from '../../../source/models/dtos/users/access/login-request';
import { TokenResponse } from '../../../source/models/dtos/users/access/token-response';
import { Utils } from '../../../source/utils';
import { UserAccessService } from '../../../services/business/user-access.service';
declare let alertify: any;

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
		await this.setupFormAsync();
	}

	override async setupFormAsync() {
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
		let model = new LoginRequest(
			this._myForm?.controls['email'].value, 
			this._myForm?.controls['password'].value);

		this.userAccessService.login(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
					let model = Object.assign(new TokenResponse(), val);
					this.localStorageService.setValue('token', model.token);
					this.router.navigateByUrl('/home');					
				}
			});
	}
}
