import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartElementResponse } from '../../../source/models/business/responses/cart-element-response';
import { Grouping } from '../../../source/models/common/grouping';
import { UpdateProductFromCartRequest } from '../../../source/models/dtos/business/update-product-from-cart-request';
import { Utils } from '../../../source/utils';
import { BusinessService } from '../../../services/business/business.service';
declare let alertify: any;
import * as lodash from 'lodash';
import { SharedService } from '../../../services/common/shared.service';
import { Tuple2 } from '../../../source/models/common/tuple';

@Component({
  selector: 'app-tab-products',
  templateUrl: './tab-products.component.html',
  styleUrl: './tab-products.component.css'
})
export class TabProductsComponent implements OnInit {        
    _cartGrouped: Grouping<string, CartElementResponse>[] = [];

    @Output() evtProcessing!: EventEmitter<boolean>;
    @Output() evtError!: EventEmitter<string|null>;
    @Output() evtNextStep!: EventEmitter<void>;
    @Output() evtCart!: EventEmitter<Grouping<string, CartElementResponse>[]>;

    constructor(
        private businessService: BusinessService,
        private sharedService: SharedService
    ) {
        this.evtProcessing = new EventEmitter<boolean>();
        this.evtError = new EventEmitter<string|null>();
        this.evtNextStep = new EventEmitter<void>();
        this.evtCart = new EventEmitter<Grouping<string, CartElementResponse>[]>();
    }

    async ngOnInit() {
		await this.refreshCartAsync();		
    }

    onQuantityFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
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
        this.evtProcessing.emit(true);

		let element = (event.target as HTMLInputElement);
		element.disabled = true;

		let model = new UpdateProductFromCartRequest(cartElement.personName, cartElement.productId, cartElement.productNewQuantity);
		await this.businessService.cart_updateProductFromCartAsync(model)
			.then(r => {       				
			}, e => {
                this.evtError.emit(Utils.getErrorsResponse(e));
			});

		await this.refreshCartAsync();

		this.evtProcessing.emit(false);
	}

    async refreshCartAsync() {	
		this.evtProcessing.emit(true);

		await this.businessService.cart_getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this.evtError.emit(Utils.getErrorsResponse(e));
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

                this.evtCart.emit(this._cartGrouped);
			}, e => {
				this.evtError.emit(Utils.getErrorsResponse(e));
			});			
		
            this.evtProcessing.emit(false); 
	}

    async onDeleteProductFromCartClicked(event: Event, cartElement: CartElementResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar el prroducto: <b>${cartElement.productName}</b>?`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component.evtProcessing.emit(true);
				component.businessService.cart_deleteProductFromCart(cartElement.id)
					.subscribe({
						complete: () => {
							component.evtProcessing.emit(false);
						},
						error: (e : string) => {
							component.evtProcessing.emit(false);
                            component.evtError.emit(Utils.getErrorsResponse(e));				
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

    onNextStepClicked(event: Event) {
        this.evtNextStep.emit();		
	}
}
