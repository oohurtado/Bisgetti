import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class CartTabDetailsComponent extends FormBase implements OnInit, AfterViewInit {
    
    @Output() evtNextStep!: EventEmitter<void>;
    @Output() evtError!: EventEmitter<string|null>;
    
    _deliveryMethods: Tuple2<string,string>[] = [];
    _addresses: AddressResponse[] = [];    

    constructor(
        private businessService: BusinessService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,
    ) {
        super();
        this.evtNextStep = new EventEmitter<void>();
    }

    ngAfterViewInit(): void {
        //
        // this._myForm.get('deliveryMethod')?.value;
        // if (deliveryMethod.param1 === 'to-send') {    
        //     this._myForm.get('address')?.addValidators(Validators.required); 
        // } else {
        //     this._myForm.get('address')?.clearValidators();                                 
        // }     
    }

    async ngOnInit() {
        this.setLists();
        await this.getAddressesAsyn();
        await this.setupFormAsync();
    }

    async getAddressesAsyn() {
        await this.businessService.cart_getUserAddressesAsync()
            .then(r => {    
                this._addresses = r;   				
            }, e => {
                this.evtError.emit(Utils.getErrorsResponse(e));
            });
    }

    setLists() {
        this._deliveryMethods = ListFactory.get("cart-delivery-methods");
    }

    override setupFormAsync(): void {
		this._myForm = this.formBuilder.group({
            deliveryMethod: [null, [Validators.required]],
            address: [null],
		});
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
        // if (deliveryMethod.param1 === 'to-send') {    
        //     this._myForm.get('address')?.addValidators(Validators.required); 
        // } else {
        //     this._myForm.get('address')?.clearValidators();                                 
        // }        
    }

    showAddress(): boolean {
        return this._myForm?.get('deliveryMethod')?.value === 'to-send';
    }
}
