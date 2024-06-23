import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBase } from '../../../../source/form-base';
import { Tuple2 } from '../../../../source/models/common/tuple';
import { PageFactory } from '../../../../source/factories/page-factory';
import { FormBuilder, Validators } from '@angular/forms';
import { UserUsersService } from '../../../../services/business/user/user-users.service';
import { ChangeRoleRequest } from '../../../../source/models/dtos/user/administration/users/change-role-request';
import { EnumRole } from '../../../../source/models/enums/role.enum';
import { RoleStrPipe } from '../../../../pipes/role-str.pipe';
import { ListFactory } from '../../../../source/factories/list-factory';
import { Utils } from '../../../../source/utils';
declare let alertify: any;

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
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
        private userUsersService: UserUsersService
    ) {
        super();
    }

    async ngOnInit() {
        this.setUrlParameters();
        this.setLists();
        await this.setupFormAsync();
    }

    setUrlParameters() {
        this.activatedRoute.params.subscribe(async params => {			
			this._userId = params['userId'];
            this._userEmail = params['userEmail'];
            this._userRole = params['userRole'];
		});	
    }

    setLists() {
        this._userRoles = ListFactory.get("user-change-role");
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

        let model = new ChangeRoleRequest(		
            this._userId,
            this._userEmail,
            this._myForm?.controls['userRole'].value,
            window.location.origin
        );

        this.userUsersService.changeRole(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);
				},
				next: (val) => {
					this.router.navigateByUrl('/users');
                    alertify.message("Cambios guardados", 1)
				}
			});
    }
}
