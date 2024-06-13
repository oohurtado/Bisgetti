import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccessService } from '../../../services/business/user/user-access.service';
import { PasswordRecoveryRequest } from '../../../source/models/dtos/user/access/password-recovery-request';
import { Utils } from '../../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-password-recovery',
    templateUrl: './password-recovery.component.html',
    styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent extends FormBase implements OnInit {

    constructor(
		private formBuilder: FormBuilder,
		private router: Router,
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
			email: ['', [Validators.required, Validators.email, Validators.minLength(1), Validators.maxLength(100)]]			
		},);
	}

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;
		let model = new PasswordRecoveryRequest(
			this._myForm?.controls['email'].value, 
			window.location.href);

		this.userAccessService.passwordRecovery(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
					this.router.navigateByUrl('/home');
                    alertify.message("Correo electrónico enviado", 3)
				}
			});
	}    
}
