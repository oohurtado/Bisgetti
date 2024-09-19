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
import { CreateOrderElementForClientRequest, CreateOrderForClientRequest } from '../../../source/models/dtos/business/cart-order-for-client-request';

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
        let total = this._cartHelper.getTotalInCart(this._cartGrouped).param1 + (this._cartDetails?.shippingCost ?? 0) + ((this._cartHelper.getTotalInCart(this._cartGrouped).param1 * (this._cartDetails?.tipPercent ?? 0)) / 100);
        this._myForm = this.formBuilder.group({
            payingWith: [total, [Validators.required, Validators.min(total)]],
            comments: ['', [Validators.maxLength(100)]],
		});

    } 

    onNextStepClicked(event: Event) {
        this._error = null!;
        
		if (!this.isFormValid()) {            
            return;
		}
        
        let cartElementRequests: CreateOrderElementForClientRequest[] = [];
        this._cartGrouped.forEach(p => {
            p.items.forEach(c => cartElementRequests.push(new CreateOrderElementForClientRequest(c.id, c.productQuantity, c.productPrice)));
        });
        
        let model = new CreateOrderForClientRequest(
            this._myForm.get('payingWith')?.value, 
            this._myForm.get('comments')?.value,
            this._cartDetails?.deliveryMethod ?? '', 
            this._cartDetails?.tipPercent ?? 0, 
            this._cartDetails?.shippingCost ?? 0, 
            this._cartDetails?.addressId ?? null,
            cartElementRequests          
        )
        
        this.businessService.cart_createOrderForClient(model)
            .subscribe({
                complete: () => {
                    this._isProcessing = false;
                },
                error: (e : string) => {
                    this._isProcessing = false;                    
                    this.evtError.emit(Utils.getErrorsResponse(e));
                },
                next: (val) => {                    
                    this.evtNextStep.emit();	
                }
            });           

	}

    onQuantityFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
	}

    onDoneClicked() {
    }
}
