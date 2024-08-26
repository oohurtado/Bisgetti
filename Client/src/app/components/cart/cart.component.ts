import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { SharedService } from '../../services/common/shared.service';
import { Utils } from '../../source/utils';
import { CartElementResponse } from '../../source/models/business/responses/cart-element-response';
import { AddressResponse } from '../../source/models/business/responses/address-response';
declare let alertify: any;
import * as lodash from 'lodash';
import { Grouping } from '../../source/models/common/grouping';
import { LocalStorageService } from '../../services/common/local-storage.service';
import { UpdateProductFromCartRequest } from '../../source/models/dtos/business/update-product-from-cart-request';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
	
	_isProcessing: boolean = false;
    _error!: string|null;

	// tabs
	_tabCurrent: number = 0;
	_tabLabels: string[] = [];
	_tabIcons: string[] = [];

	_quantities: number[] = Array(50).fill(0).map((_, index)=> index);

	_cartGrouped: Grouping<string, CartElementResponse>[] = [];
	_addresses : AddressResponse[] = [];

	constructor(
		private businessService: BusinessService,		
		private sharedService: SharedService
	) {		
	}

	async ngOnInit() {
		this.initTabs();
		await this.refreshCartAsync();
		await this.refreshAddressesAsync();
	}

	initTabs() {
		this._tabLabels.push("Carrito");
		this._tabLabels.push("Últimos detalles");
		this._tabLabels.push("Confirmación y Envío");

		this._tabIcons.push("fa-cart-shopping");
		this._tabIcons.push("fa-list-check");
		this._tabIcons.push("fa-truck-fast");
	}
	
	onTabClicked(event: Event, tabNew: number) {
		if (tabNew < this._tabCurrent) {
			this._tabCurrent = tabNew;
		}
}

	async refreshCartAsync() {	
		this._isProcessing = true;	
		await this.businessService.getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this._error = Utils.getErrorsResponse(e);
				alertify.error(this._error, 1)
			});
		
		await this.businessService.getProductsFromCartAsync()
			.then(r => {
				let cartElements = r;   
				
				this._cartGrouped = lodash.map(lodash.groupBy(cartElements, p => p.personName), (data, key) => {
					let info: Grouping<string, CartElementResponse> = new Grouping<string, CartElementResponse>();
					info.key = key;
					info.items = data;
					return info;
				});
			}, e => {
				this._error = Utils.getErrorsResponse(e);
				alertify.error(this._error, 1)
			});			
		this._isProcessing = false;  
	}

	async refreshAddressesAsync() {
		this._isProcessing = true;	
		await this.businessService.getUserAddressesAsync()
			.then(r => {
				this._addresses = r;            
			}, e => {
				this._error = Utils.getErrorsResponse(e);
				alertify.error(this._error, 1)
			});
		this._isProcessing = false;  
	}
	

	// TODO: actualizar con boton
	// TODO: boton para borrar
	async onQuantity(event: Event, product: CartElementResponse) {
		let value = Number((event.target as HTMLInputElement).value);						

		// this._isProcessing = true;	
		// let model = new UpdateProductFromCartRequest(product.personName, product.productId, value);
		// await this.businessService.updateProductFromCartAsync(model)
		// 	.then(r => {						
		// 	}, e => {
		// 		this._error = Utils.getErrorsResponse(e);
		// 		alertify.error(this._error, 1)
		// 	});		
		// this._isProcessing = false;	
		// await this.refreshCartAsync();
	}

	getTotalByPerson(products: CartElementResponse[]) {
		let sum = 0;
		products.forEach(p => sum += p.productPrice * p.productQuantity);
		return sum;
	}

	onFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
	}
}
