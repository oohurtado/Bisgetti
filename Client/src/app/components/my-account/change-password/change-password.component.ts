import { Component, OnInit } from '@angular/core';
import { UserMyAccountService } from '../../../services/business/user-my-account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from '../../../source/common/form-base';
import { FormBuilder, Validators } from '@angular/forms';
import { UserValidatorService } from '../../../services/validators/user-validator.service';
import { ChangePasswordRequest } from '../../../source/models/dtos/users/password/change-password.request';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Utils } from '../../../source/common/utils';
declare let alertify: any;

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent extends FormBase implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
        private userMyAccountService: UserMyAccountService,
        private userValidator: UserValidatorService,
        private localStorageService: LocalStorageService
    ) {
        super();
    }

    async ngOnInit() {
        await this.setupFormAsync();
    }

    override async setupFormAsync() {
        this._myForm = this.formBuilder.group({
			currentPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
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

        let model = new ChangePasswordRequest(		
            this._myForm?.controls['currentPassword'].value,
            this._myForm?.controls['newPassword'].value
        );

        this.userMyAccountService.changePassword(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
                    this.localStorageService.clean();
					this.router.navigateByUrl('/access/login');
                    alertify.message("Ingrese sus credenciales nuevamente por favor", 3)
				}
			});
    }
}
