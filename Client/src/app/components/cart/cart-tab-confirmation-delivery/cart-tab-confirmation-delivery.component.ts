import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Utils } from '../../../source/utils';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { FormBase } from '../../../source/form-base';
import { CartDetails } from '../../../source/models/business/common/cart-details';
import { AddressResponse } from '../../../source/models/dtos/entities/address-response';
import { CartElementResponse } from '../../../source/models/dtos/entities/cart-element-response';
import { Grouping } from '../../../source/models/common/grouping';
import * as lodash from 'lodash';
import { Tuple2 } from '../../../source/models/common/tuple';
import { CartHelper } from '../../../source/cart-helper';
import { general } from '../../../source/general';

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

    _cartHelper = new CartHelper();
    
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
        await Utils.delay(100);
        await this.getAllAsync();
        await this.setupFormAsync();
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
			}, e => {
				this.evtError.emit(Utils.getErrorsResponse(e));
			});		

        if (this._cartDetails?.deliveryMethod === general.DELIVERY_METHOD_FOR_DELIVER) {
            await this.businessService.cart_getUserAddressAsync(this._cartDetails?.addressId)
                .then(r => {
                    this._address = r;
                }, e => {
                    this.evtError.emit(Utils.getErrorsResponse(e));
                });
        }
        


        this.evtProcessing.emit(false);     
    }

    override setupFormAsync(): void {
        this._myForm = this.formBuilder.group({
            payingWith: ['0.0', [Validators.required]],
            comments: ['', [Validators.maxLength(100)]],
		});

    } 

    onNextStepClicked(event: Event) {
        this._error = null!;
        
		if (!this.isFormValid()) {            
            return;
		}
        
        // ids del carrito
        let cartElementIds: number[] = [];
        this._cartGrouped.forEach(p => {
            p.items.forEach(c => cartElementIds.push(c.id));
        });
        
        console.log('cartElementIds', cartElementIds);
        console.log('_cartDetails = ', this._cartDetails);
        console.log('_address = ', this._address);
        console.log('payingWith', this._myForm.get('payingWith')?.value)
        console.log('comments', this._myForm.get('comments')?.value)
        //this.evtNextStep.emit();		
	}

    onQuantityFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
	}

    onDoneClicked() {
    }
}
