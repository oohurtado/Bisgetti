import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from '../../../source/utils';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { FormBase } from '../../../source/form-base';
import { CartDetails } from '../../../source/models/business/common/cart-details';
import { AddressResponse } from '../../../source/models/business/responses/address-response';
import { CartElementResponse } from '../../../source/models/business/responses/cart-element-response';
import { Grouping } from '../../../source/models/common/grouping';
import * as lodash from 'lodash';
import { Tuple2 } from '../../../source/models/common/tuple';

@Component({
    selector: 'app-cart-tab-confirmation-delivery',
    templateUrl: './cart-tab-confirmation-delivery.component.html',
    styleUrl: './cart-tab-confirmation-delivery.component.css'
})
export class CartTabConfirmationDeliveryComponent extends FormBase implements OnInit {

    @Input() _cartDetails!: CartDetails|null;
    
    @Output() evtProcessing!: EventEmitter<boolean>;
    @Output() evtError!: EventEmitter<string | null>;
    @Output() evtNextStep!: EventEmitter<void>;

    _cartGrouped: Grouping<string, CartElementResponse>[] = [];
    _address: AddressResponse|null = null;
    
    constructor(
        private businessService: BusinessService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
    ) {
        super();
        this.evtProcessing = new EventEmitter<boolean>();
        this.evtError = new EventEmitter<string|null>();
        this.evtNextStep = new EventEmitter<void>();
    }   

    async ngOnInit() {
        console.log(this._cartDetails)
        await Utils.delay(100);
        await this.getAllAsync();
    }

    async getAllAsync() {
        this.evtProcessing.emit(true);

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

                console.log(this._cartGrouped)
			}, e => {
				this.evtError.emit(Utils.getErrorsResponse(e));
			});		

        if (this._cartDetails?.deliveryMethod === 'for-delivery') {
            await this.businessService.cart_getUserAddressAsync(this._cartDetails?.addressId)
                .then(r => {
                    this._address = r;
                    console.log(this._address)
                }, e => {
                    this.evtError.emit(Utils.getErrorsResponse(e));
                });
        }
        


        this.evtProcessing.emit(false);     
    }

    override setupFormAsync(): void {
        throw new Error('Method not implemented.');
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
