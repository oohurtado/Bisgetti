import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { PageBase } from '../../../../../source/page-base';
import { Router } from '@angular/router';
import { BusinessService } from '../../../../../services/business/business.service';
import { LocalStorageService } from '../../../../../services/common/local-storage.service';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { Utils } from '../../../../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css'
})
export class ProductsListComponent extends PageBase<ProductResponse> implements OnInit {
    
    constructor(
        private businessService: BusinessService,
        private router: Router,
        localStorageService: LocalStorageService
    ) {
        super('products', localStorageService);
    }

    async ngOnInit() {
        await this.getDataAsync();
    }

    override async getDataAsync() {
        this._error = null;
        this._isProcessing = true;
        await this.businessService
            .getProductsByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
            .then(p => {
                this._pageData = p;
                this.updatePage(p);
            })
            .catch(e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;
    }

    onUpdateClicked(event: Event, product: ProductResponse) {
        this.router.navigateByUrl(`/menu-stuff/products/update/${product.id}`);
    }

    override onCreateClicked(event: Event): void {
        this.router.navigateByUrl(`/menu-stuff/products/create`);
    }

    onDeleteClicked(event: Event, product: ProductResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar el producto: <b>${product.name}</b>?
			`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component._isProcessing = true;
				component.businessService.deleteProduct(product.id)
					.subscribe({
						complete: () => {
							component._isProcessing = false;
						},
						error: (e : string) => {
							component._isProcessing = false;
							component._error = Utils.getErrorsResponse(e);					
						},
						next: (val) => {							
							component._pageData.data = component._pageData.data.filter(p => p.id != product.id);
							alertify.message("Producto borrado", 1)
						}
					});				
			},
			function () {
				// ...
			});		
	}    
}
