import { AfterViewChecked, AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBase } from '../../../source/form-base';
import { Tuple2 } from '../../../source/models/common/tuple';
import { ListFactory } from '../../../source/factories/list-factory';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { Utils } from '../../../source/utils';
import { AddressResponse } from '../../../source/models/business/responses/address-response';

@Component({
    selector: 'app-cart-tab-details',
    templateUrl: './cart-tab-details.component.html',
    styleUrl: './cart-tab-details.component.css'
})
export class CartTabDetailsComponent extends FormBase implements OnInit {
    
    @Output() evtNextStep!: EventEmitter<void>;
    @Output() evtError!: EventEmitter<string|null>;
    
    _deliveryMethods: Tuple2<string,string>[] = [];
    
    _addresses: AddressResponse[] = [];    
    _tips: number[] = [];
    _total: number = 0;
    _shippingCost: number = 0;

    _summary_shippingCost: number = 0;
    
    _deliveryMethodWasClicked: boolean = false;
    _displayAddresses: boolean = false

    constructor(
        private businessService: BusinessService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
    ) {
        super();
        this.evtNextStep = new EventEmitter<void>();
    }    

    async ngOnInit() {
        this.setLists();
        await this.getAllAsync();
        await this.setupFormAsync();
    }

    setLists() {
        this._deliveryMethods = ListFactory.get("cart-delivery-methods");
    }

    async getAllAsync() {
        this._isProcessing = true;
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
                this._total = r[2].total;
                this._shippingCost = r[3].total;
            }, e => {
                this.evtError.emit(Utils.getErrorsResponse(e));
            });
        this._isProcessing = false;        
    }

    override setupFormAsync(): void {
		this._myForm = this.formBuilder.group({
            deliveryMethod: [null, [Validators.required]],
            address: [null],
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

        this.evtNextStep.emit();	        	
	}

    onDoneClicked() {
    }

    async onDeliveryMethodClicked(event: Event, deliveryMethod: Tuple2<string,string>) {
        await Utils.delay(100);        
        this._myForm.get('address')?.addValidators(Validators.required);
        this._myForm.get('address')?.updateValueAndValidity();

        // new Tuple2("on-site", "Comer en el restaurante"),
        // new Tuple2("take-away", "Ir al restaurante a recoger la comida"),
        // new Tuple2("for-delivery", "Enviar a una dirección"),

        if (deliveryMethod.param1 === 'on-site' || deliveryMethod.param1 === 'take-away') {
            this._summary_shippingCost = 0;
        } else if (deliveryMethod.param1 === 'for-delivery') {
            this._summary_shippingCost = this._shippingCost;
        }
    }

    isDeliveryMethodToSendSelected(): boolean {
        return this._myForm?.get('deliveryMethod')?.value === 'for-delivery';
    }
}
