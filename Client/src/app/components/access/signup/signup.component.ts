import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { UserValidatorService } from '../../../services/validators/user-validator.service';
import { SignupRequest } from '../../../source/models/dtos/users/access/signup-request';
import { TokenResponse } from '../../../source/models/dtos/users/access/token-response';
import { Utils } from '../../../source/utils';
import { UserAccessService } from '../../../services/business/user-access.service';
import { general } from '../../../source/general';
declare let alertify: any;

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
		await this.setupFormAsync();
	}

	override async setupFormAsync() {
		await this.setupForm();
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
		let model = new SignupRequest(
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
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
					let model = Object.assign(new TokenResponse(), val);
					this.localStorageService.setValue('token', model.token);
					this.router.navigateByUrl('/home');
					alertify.message("Bienvenido a " + general.RESTAURANT_NAME, 1)
				}
			});
	}
}
