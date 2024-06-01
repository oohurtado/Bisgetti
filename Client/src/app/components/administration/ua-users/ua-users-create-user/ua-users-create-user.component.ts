import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAdministrationService } from '../../../../services/business/user/user-administration.service';
import { LocalStorageService } from '../../../../services/common/local-storage.service';
import { UserValidatorService } from '../../../../services/validators/user-validator.service';
import { ListFactory } from '../../../../source/factories/list-factory';
import { FormBase } from '../../../../source/form-base';
import { Tuple2 } from '../../../../source/models/common/tuple';
import { UserCreateUserRequest } from '../../../../source/models/dtos/user/administrations/user-create-user-request';

@Component({
    selector: 'app-ua-users-create-user',
    templateUrl: './ua-users-create-user.component.html',
    styleUrl: './ua-users-create-user.component.css'
})
export class UaUsersCreateUserComponent extends FormBase implements OnInit {
    
    _userRoles: Tuple2<string,string>[] = [];
	_navigation = ListFactory.getNavigation('admin-users-create-user');

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private localStorageService: LocalStorageService,
		private userAdministrationService: UserAdministrationService,
		private userValidator: UserValidatorService,
	) {
		super();
	}

	async ngOnInit() {
        this.setLists();
		this.setupFormAsync();
	}

    setLists() {
        this._userRoles.push(new Tuple2("user-admin", "Administrador"));
        this._userRoles.push(new Tuple2("user-boss", "Jefe"));
        this._userRoles.push(new Tuple2("user-client", "Cliente"));
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
            userRole: [null, [Validators.required]]
		});
	}

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

		let _pending = '[pendiente]';
        let model = new UserCreateUserRequest(
			this._myForm?.controls['firstName'].value, 
			this._myForm?.controls['lastName'].value, 
			this._myForm?.controls['phoneNumber'].value,
			this._myForm?.controls['email'].value,
			this._myForm?.controls['password'].value,
            this._myForm?.controls['userRole'].value
        );

        this.userAdministrationService.createUser(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = errorResponse;
				},
				next: (val) => {
					this.router.navigateByUrl('/ua/users');
				}
			});
	}

	onHomeClicked() {
		this.router.navigateByUrl('/home');
	}

	onBackClicked() {
		this.router.navigateByUrl('/ua/users');
	}
}
