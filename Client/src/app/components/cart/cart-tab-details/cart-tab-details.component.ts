import { AfterViewChecked, AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBase } from '../../../source/common/form-base';
import { Tuple2 } from '../../../source/models/common/tuple';
import { ListFactory } from '../../../source/factories/list-factory';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { Utils } from '../../../source/common/utils';
import { AddressResponse } from '../../../source/models/dtos/entities/address-response';
import { CartDetails } from '../../../source/models/business/common/cart-details';
import { CartHelper } from '../../../source/helpers/cart-helper';
import { general } from '../../../source/common/general';
import { EnumDeliveryMethod } from '../../../source/models/enums/delivery-method-enum';

@Component({
    selector: 'app-cart-tab-details',
    templateUrl: './cart-tab-details.component.html',
    styleUrl: './cart-tab-details.component.css'
})
export class CartTabDetailsComponent extends FormBase implements OnInit {
    
    @Output() evtProcessing!: EventEmitter<boolean>;
    @Output() evtError!: EventEmitter<string|null>;
    @Output() evtNextStep!: EventEmitter<void>;
    @Output() evtCartDetails!: EventEmitter<CartDetails|null>;
    
    _deliveryMethods: Tuple2<string,string>[] = [];
    
    _addresses: AddressResponse[] = [];    
    _tips: number[] = [];
    _totalProducts: number = 0;
    _shippingCost: number = 0;     
    
    _cartDetail!: CartDetails;
    
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
        this.evtCartDetails = new EventEmitter<CartDetails|null>();
        this._cartDetail = new CartDetails();
    }    

    async ngOnInit() {
        await Utils.delay(100);
        this.setLists();
        await this.getAllAsync();
        await this.setupFormAsync();
    }

    setLists() {
        this._deliveryMethods = ListFactory.get("cart-delivery-methods");
    }

    async getAllAsync() {
        this.evtProcessing.emit(true);
        await Promise.all(
            [
                this.businessService.cart_getUserAddressesAsync(),
                this.businessService.cart_getTipsAsync(),
                this.businessService.cart_getTotalOfProductsInCartAsync(),
                this.businessService.cart_getShippingCostAsync(),
            ])
            .then(r => {
                this._addresses = r[0];
                this._tips = r[1];
                this._totalProducts = r[2].total;
                this._shippingCost = r[3].total;
            }, e => {
                this.evtError.emit(Utils.getErrorsResponse(e));
            });
        this.evtProcessing.emit(false);     
    }

    override setupFormAsync(): void {
		this._myForm = this.formBuilder.group({
            deliveryMethod: [null, [Validators.required]],
            address: [null],
            tip: [null, [Validators.required]],
		});

        let addresses = this._addresses.filter(p => p.isDefault);
        if (addresses.length > 0) {
            this._myForm.get('address')?.setValue(addresses[0].id);
        }
    }

    onNextStepClicked(event: Event) {
        this._error = null!;
        
		if (!this.isFormValid()) {            
            return;
		}

        this._cartDetail.deliveryMethod = this._myForm?.get('deliveryMethod')?.value;
        this._cartDetail.addressId = this._myForm?.get('address')?.value;
        if (this._cartDetail.deliveryMethod !== EnumDeliveryMethod.ForDelivery) {
            this._cartDetail.addressId = null;
        }


        this.evtCartDetails.emit(this._cartDetail);
        this.evtNextStep.emit();	        	
	}

    onDoneClicked() {
    }

    async onDeliveryMethodClicked(event: Event, deliveryMethod: Tuple2<string,string>) {
        await Utils.delay(100);        
        
        if (deliveryMethod.param1 === EnumDeliveryMethod.TakeAway) {
            this._myForm.get('address')?.removeValidators(Validators.required)
            this._myForm.get('address')?.updateValueAndValidity();
            this._cartDetail.shippingCost = 0;
        } else if (deliveryMethod.param1 === EnumDeliveryMethod.ForDelivery) {
            this._myForm.get('address')?.addValidators(Validators.required);
            this._myForm.get('address')?.updateValueAndValidity();
            this._cartDetail.shippingCost = this._shippingCost;            
        }
    }

    isDeliveryMethodForDeliverySelected(): boolean {
        return this._myForm?.get('deliveryMethod')?.value === EnumDeliveryMethod.ForDelivery;
    }

    onTipClicked(event: Event, tipPercent: number) {
        this._cartDetail.tipPercent = tipPercent;
    }
}
