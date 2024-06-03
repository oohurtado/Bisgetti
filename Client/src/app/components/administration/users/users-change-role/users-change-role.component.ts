import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from '../../../../source/form-base';
import { Tuple2 } from '../../../../source/models/common/tuple';
import { ListFactory } from '../../../../source/factories/list-factory';
import { FormBuilder, Validators } from '@angular/forms';
import { UserAdministrationService } from '../../../../services/business/user/user-administration.service';
import { UserChangeRoleRequest } from '../../../../source/models/dtos/user/administration/user-change-role-request';
import { EnumRole } from '../../../../source/models/enums/role.enum';
import { RoleStrPipe } from '../../../../pipes/role-str.pipe';

@Component({
    selector: 'app-users-change-user-role',
    templateUrl: './users-change-role.component.html',
    styleUrl: './users-change-role.component.css'
})
export class UsersChangeRoleComponent extends FormBase implements OnInit {
    
    _userId!: string;
    _userEmail!: string;
    _userRole!: string;

    _userRoles: Tuple2<string,string>[] = [];
	_navigation = ListFactory.getNavigation('home-true,hack-true');
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
        private userAdministrationService: UserAdministrationService
    ) {
        super();
    }

    async ngOnInit() {
        this.setParameters();
        this.setLists();
        await this.setupFormAsync();
    }

    setParameters() {
        this.activatedRoute.params.subscribe(async params => {			
			this._userId = params['userId'];
            this._userEmail = params['userEmail'];
            this._userRole = params['userRole'];

            console.log(this._userId,this._userEmail,this._userRole)
		});	
    }

    setLists() {
        let pipe = new RoleStrPipe();
        this._userRoles.push(new Tuple2(EnumRole.UserAdmin, pipe.transform(EnumRole.UserAdmin)));
        this._userRoles.push(new Tuple2(EnumRole.UserBoss, pipe.transform(EnumRole.UserBoss)));
        this._userRoles.push(new Tuple2(EnumRole.UserCustomer, pipe.transform(EnumRole.UserCustomer)));
    }

    override async setupFormAsync() {
		this._myForm = this.formBuilder.group({
            userRole: [null, [Validators.required]]
		});

        this._myForm.get('userRole')?.setValue(this._userRole);
    }

    onDoneClicked() {
        this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new UserChangeRoleRequest(		
            this._userId,
            this._userEmail,
            this._myForm?.controls['userRole'].value
        );

        this.userAdministrationService.changeRole(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (errorResponse : string) => {
					this._isProcessing = false;
					this._error = errorResponse;
				},
				next: (val) => {
					this.router.navigateByUrl('/administration/users');
				}
			});
    }

    onHomeClicked() {
		this.router.navigateByUrl('/home');
	}

	onBackClicked() {
		this.router.navigateByUrl('/administration/users');
	}
}
