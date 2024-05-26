import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { UserAccessService } from '../../../services/business/user/user-access.service';
import { UserValidatorService } from '../../../services/validators/user-validator.service';
import { cloneWith } from 'lodash';
import { UserSignupRequest } from '../../../source/models/dtos/user/access/user-signup-request.model';
import { UserTokenResponse } from '../../../source/models/dtos/user/access/user-token-response.model';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css'
})
export class SignupComponent extends FormBase implements OnInit {
	
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private localStorageService: LocalStorageService,
		private userAccessService: UserAccessService,
		private userValidator: UserValidatorService
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
			firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			email: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(100)], [this.userValidator.isEmailAvailable.bind(this.userValidator)]],
			password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
			repeatPassword: ['', [Validators.required, Validators.maxLength(100)]]
		}, {
			validator: [this.userValidator.comparePassword('password', 'repeatPassword')]
		});
	}

	onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;
		let model = new UserSignupRequest(
			this._myForm?.controls['firstName'].value, 
			this._myForm?.controls['lastName'].value, 
			this._myForm?.controls['phoneNumber'].value,
			this._myForm?.controls['email'].value,
			this._myForm?.controls['password'].value);

		this.userAccessService.signup(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = errorResponse;
				},
				next: (val) => {
					let model = Object.assign(new UserTokenResponse(), val);
					this.localStorageService.setValue('token', model.token);
					this.router.navigateByUrl('/home');
				}
			});
	}
}
