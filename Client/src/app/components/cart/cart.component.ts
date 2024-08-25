import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { SharedService } from '../../services/common/shared.service';
import { Utils } from '../../source/utils';
import { CartElementResponse } from '../../source/models/business/responses/cart-element-response';
import { AddressResponse } from '../../source/models/business/responses/address-response';
declare let alertify: any;

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
	
	_isProcessing: boolean = false;
    _error!: string|null;

	constructor(
		private businessService: BusinessService,
		private sharedService: SharedService
	) {

	}

	async ngOnInit() {
		await this.refreshCartAsync();
	}

	async refreshCartAsync() {		
		await this.businessService.getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this._error = Utils.getErrorsResponse(e);
			});
	}

	async getAllAsync(menuId: number) {
        this._isProcessing = true;
        await Promise.all(
            [
                this.businessService.getProductsFromCartAsync(), 
                this.businessService.getUserAddressesAsync(), 
            ])
            .then(r => {
                let cart = r[0] as CartElementResponse;
                let addresses = r[1] as AddressResponse[];
            }, e => {
                this._error = Utils.getErrorsResponse(e);
                alertify.error(this._error, 1)
            });
        this._isProcessing = false;        
    }
}
