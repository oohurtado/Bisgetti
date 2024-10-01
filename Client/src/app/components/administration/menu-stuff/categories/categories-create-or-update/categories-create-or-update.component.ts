import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../../../source/models/dtos/entities/category-response';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../../../services/business/business.service';
import { FormBase } from '../../../../../source/common/form-base';
import { Utils } from '../../../../../source/common/utils';
import { CreateOrUpdateCategoryRequest } from '../../../../../source/models/dtos/menus/create-or-update-category-request';
declare let alertify: any;

@Component({
    selector: 'app-categories-create-or-update',
    templateUrl: './categories-create-or-update.component.html',
    styleUrl: './categories-create-or-update.component.css'
})
export class CategoriesCreateOrUpdateComponent extends FormBase implements OnInit {

    _categoryId!: number;
    _category!: CategoryResponse;

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
			this._categoryId = params['id'];
            if (this._categoryId !== null && this._categoryId !== undefined) {
                await this.getDataAsync(this._categoryId);
            }
            await this.setupFormAsync();
		});	
    }

    async getDataAsync(id: number) {
		this._error = null;
        this._isLoading = true;
        await this.businessService
            .category_getCategoryAsync(id)
            .then(p => {
				this._category = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
        this._isLoading = false;
    }

    override setupFormAsync() {
        if (this._category === null || this._category === undefined) {
            this._myForm = this.formBuilder.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                description: ['', [Validators.maxLength(100)]],
            });

            this._myForm.get('country')?.setValue("México");
        } else {
            this._myForm = this.formBuilder.group({
                name: [this._category.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                description: [this._category.description, [Validators.maxLength(100)]],
            });
        }
    }

    onDoneClicked() {

		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new CreateOrUpdateCategoryRequest(
            this._myForm?.controls['name'].value, 
            this._myForm?.controls['description'].value, 
            );

        if (this._categoryId === null || this._categoryId === undefined) {
            this.businessService.category_createCategory(model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/categories/list');
                        alertify.message("Categoría creada", 1)
                    }
                });
        }   
        else {
            this.businessService.category_updateCategory(this._categoryId, model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/categories/list');
                        alertify.message("Cambios guardados", 1)
                    }
                });
        }         
    }    
}
