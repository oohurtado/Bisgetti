import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccessService } from '../../../services/business/user/user-access.service';
import { UserValidatorService } from '../../../services/validators/user-validator.service';
import { PasswordSetRequest } from '../../../source/models/dtos/user/access/password-set-request';
import { Utils } from '../../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-password-set',
    templateUrl: './password-set.component.html',
    styleUrl: './password-set.component.css'
})
export class PasswordSetComponent extends FormBase implements OnInit {

    _email!: string;
    _token!: string;

    constructor(
        private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private userAccessService: UserAccessService,
        private userValidator: UserValidatorService
    ) {
        super();        
    }

	async ngOnInit() {
		
        await this.setUrlParametersAsync();
	}

	override async setupFormAsync() {
		this.setupForm();
	}

    setUrlParametersAsync() {
        this.activatedRoute.params.subscribe(async params => {			
			this._email = params['email'];
            this._token = params['token'];
            await this.setupFormAsync();
		});	
    }

    setupForm() {
		this._myForm = this.formBuilder.group({
            newPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
			repeatNewPassword: ['', [Validators.required, Validators.maxLength(100)]]
		}, {
			validator: [this.userValidator.comparePassword('newPassword', 'repeatNewPassword')]
		});
	}

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;
		let model = new PasswordSetRequest(
            this._email, 
			this._myForm?.controls['newPassword'].value,
			this._token);

		this.userAccessService.passwordSet(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
					this.router.navigateByUrl('/access/login');
                    alertify.message("Ahora, inicia sesión nuevamente!", 3)
				}
			});
	}    
}
