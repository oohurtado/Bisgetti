import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../../../source/form-base';
import { BusinessService } from '../../../../../services/business/business.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuResponse } from '../../../../../source/models/dtos/entities/menu-response';
import { Utils } from '../../../../../source/utils';
import { CreateOrUpdateMenuRequest } from '../../../../../source/models/dtos/menus/create-or-update-menu-request';
declare let alertify: any;

@Component({
    selector: 'app-menus-create-or-update',
    templateUrl: './menus-create-or-update.component.html',
    styleUrl: './menus-create-or-update.component.css'
})
export class MenusCreateOrUpdateComponent extends FormBase implements OnInit {

    _menuId!: number;
    _menu!: MenuResponse;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
        private businessService: BusinessService
    ) {
        super();
    }

    async ngOnInit() {
        await this.setUrlParametersAsync();
    }

    async setUrlParametersAsync() {
        this.activatedRoute.params.subscribe(async params => {			
			this._menuId = params['id'];
            if (this._menuId !== null && this._menuId !== undefined) {
                await this.getDataAsync(this._menuId);
            }
            await this.setupFormAsync();
		});	
    }

    async getDataAsync(id: number) {
		this._error = null;
        this._isLoading = true;
        await this.businessService
            .menu_getMenuAsync(id)
            .then(p => {
				this._menu = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
        this._isLoading = false;
    }

    override setupFormAsync() {
        if (this._menu === null || this._menu === undefined) {
            this._myForm = this.formBuilder.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                description: ['', [Validators.maxLength(100)]],
            });

            this._myForm.get('country')?.setValue("México");
        } else {
            this._myForm = this.formBuilder.group({
                name: [this._menu.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                description: [this._menu.description, [Validators.maxLength(100)]],
            });
        }
    }

    onDoneClicked() {

		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new CreateOrUpdateMenuRequest(
            this._myForm?.controls['name'].value, 
            this._myForm?.controls['description'].value, 
            );

        if (this._menuId === null || this._menuId === undefined) {
            this.businessService.menu_createMenu(model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/menus/list');
                        alertify.message("Menú creado", 1)
                    }
                });
        }   
        else {
            this.businessService.menu_updateMenu(this._menuId, model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/menus/list');
                        alertify.message("Cambios guardados", 1)
                    }
                });
        }         
    }

}
