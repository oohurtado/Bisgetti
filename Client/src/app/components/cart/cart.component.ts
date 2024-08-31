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
import { Tuple2 } from '../../source/models/common/tuple';

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
		await this.businessService.cart_getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this._error = Utils.getErrorsResponse(e);
				alertify.error(this._error, 1)
			});
		
		await this.businessService.cart_getProductsFromCartAsync()
			.then(r => {
				let cartElements = r;   
				
				this._cartGrouped = lodash.map(lodash.groupBy(cartElements, p => p.personName), (data, key) => {
					let info: Grouping<string, CartElementResponse> = new Grouping<string, CartElementResponse>();
					info.key = key;
					info.items = data

					data.forEach(x => x.productNewQuantity = x.productQuantity)

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
		await this.businessService.cart_getUserAddressesAsync()
			.then(r => {
				this._addresses = r;            
			}, e => {
				this._error = Utils.getErrorsResponse(e);
				alertify.error(this._error, 1)
			});
		this._isProcessing = false;  
	}
	
	async onQuantityChanged(event: Event, cartElement: CartElementResponse) {
		let element = (event.target as HTMLInputElement);
		let value = Number(element.value);	
		
		let tmp = document.querySelector(`.btn-${cartElement.id}`);
		let button = tmp as HTMLButtonElement;
		if (value != cartElement.productQuantity) {
			button.disabled = false;
		}			
		else {
			button.disabled = true;
		}
		
		cartElement.productNewQuantity = value;
	}

	async onUpdateProductFromCartClicked(event: Event, cartElement: CartElementResponse) {
		this._isProcessing = true;	

		let element = (event.target as HTMLInputElement);
		element.disabled = true;

		let model = new UpdateProductFromCartRequest(cartElement.personName, cartElement.productId, cartElement.productNewQuantity);
		await this.businessService.cart_updateProductFromCartAsync(model)
			.then(r => {       				
			}, e => {
				this._error = Utils.getErrorsResponse(e);
			});

		await this.refreshCartAsync();

		this._isProcessing = false;	
	}

	async onDeleteProductFromCartClicked(event: Event, cartElement: CartElementResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar el prroducto: <b>${cartElement.productName}</b>?`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component._isProcessing = true;
				component.businessService.cart_deleteProductFromCart(cartElement.id)
					.subscribe({
						complete: () => {
							component._isProcessing = false;
						},
						error: (e : string) => {
							component._isProcessing = false;
							component._error = Utils.getErrorsResponse(e);					
						},
						next: async (val) => {							
							alertify.message("Producto eliminado del carrito", 1)
							await component.refreshCartAsync();
						}
					});				
			},
			function () {
				// ...
			});		
	}

	getTotalByPerson(products: CartElementResponse[]) {
		let sum = 0;
		products.forEach(p => sum += p.productPrice * p.productQuantity);
		return sum;
	}

	getTotal() {
		let sum = 0;
		let count = 0;

		this._cartGrouped.forEach(p => {
			p.items.forEach(q => { 
				sum += q.productPrice * q.productQuantity 
				count += q.productQuantity;
			})
		});
		return new Tuple2<number,number>(sum,count);
	}

	onFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
	}
}
