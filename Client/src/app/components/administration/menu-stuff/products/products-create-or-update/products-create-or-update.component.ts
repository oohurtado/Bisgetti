import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../../../services/business/business.service';
import { FormBase } from '../../../../../source/form-base';
import { ProductResponse } from '../../../../../source/models/dtos/entities/product-response';
import { Utils } from '../../../../../source/utils';
import { CreateOrUpdateProductRequest } from '../../../../../source/models/dtos/menus/create-or-update-product-request';
declare let alertify: any;

@Component({
    selector: 'app-products-create-or-update',
    templateUrl: './products-create-or-update.component.html',
    styleUrl: './products-create-or-update.component.css'
})
export class ProductsCreateOrUpdateComponent extends FormBase implements OnInit {

    _productId!: number;
    _product!: ProductResponse;

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
			this._productId = params['id'];
            if (this._productId !== null && this._productId !== undefined) {
                await this.getDataAsync(this._productId);
            }
            await this.setupFormAsync();
		});	
    }

    async getDataAsync(id: number) {
		this._error = null;
        this._isLoading = true;
        await this.businessService
            .product_getProductAsync(id)
            .then(p => {
				this._product = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);	
			});
        this._isLoading = false;
    }

    override setupFormAsync() {
        if (this._product === null || this._product === undefined) {
            this._myForm = this.formBuilder.group({
                name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                price: ['0.0', [Validators.required, Validators.min(0)]],
                description: ['', [Validators.maxLength(100)]],
                ingredients: ['', [Validators.maxLength(100)]],
            });

            this._myForm.get('country')?.setValue("México");
        } else {
            this._myForm = this.formBuilder.group({
                name: [this._product.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
                price: [this._product.price, [Validators.required, Validators.min(0)]],
                description: [this._product.description, [Validators.maxLength(100)]],
                ingredients: [this._product.ingredients, [Validators.maxLength(100)]],
            });
        }
    }

    onDoneClicked() {

		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new CreateOrUpdateProductRequest(
            this._myForm?.controls['name'].value, 
            this._myForm?.controls['description'].value, 
            this._myForm?.controls['ingredients'].value, 
            this._myForm?.controls['price'].value
            );

        if (this._productId === null || this._productId === undefined) {
            this.businessService.product_createProduct(model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/products/list');
                        alertify.message("Producto creada", 1)
                    }
                });
        }   
        else {
            this.businessService.product_updateProduct(this._productId, model)
                .subscribe({
                    complete: () => {
                        this._isProcessing = false;
                    },
                    error: (e : string) => {
                        this._isProcessing = false;
                        this._error = Utils.getErrorsResponse(e);
                    },
                    next: (val) => {
                        this.router.navigateByUrl('menu-stuff/products/list');
                        alertify.message("Cambios guardados", 1)
                    }
                });
        }         
    }   

}
