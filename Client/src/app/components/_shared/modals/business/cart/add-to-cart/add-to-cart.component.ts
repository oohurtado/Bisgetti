import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/common/menu-element';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonResponse } from '../../../../../../source/models/business/responses/person-response';
import { AddProductToCartRequest } from '../../../../../../source/models/dtos/business/add-product-to-cart-request';
import { BusinessService } from '../../../../../../services/business/business.service';
import { Utils } from '../../../../../../source/utils';

@Component({
    selector: 'app-add-to-cart',
    templateUrl: './add-to-cart.component.html',
    styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent implements OnChanges, OnInit {
    @Input() open!: boolean;
    @Input() productElement!: MenuElement;
    @Input() lastPersonSelected!: string;
    @Input() people: PersonResponse[] = [];

    @ViewChild('openModal', { static: true }) openModal!: ElementRef;
    @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

    @Output() evtOk!: EventEmitter<string>;
	@Output() evtClose!: EventEmitter<void>;

    _isProcessing: boolean = false;
    _error!: string|null;

    _myForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private businessService: BusinessService
    ) {
		this.evtOk = new EventEmitter<string>();
		this.evtClose = new EventEmitter<void>();
        this._error = null;
	}

    ngOnInit(): void {    
        this._myForm = this.formBuilder.group({
            name: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
            quantity: [1, [Validators.required,Validators.min(1), Validators.max(50)]],
        });
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.open = changes['open']?.currentValue;
		
		if (this.open) {            
            this.openModal.nativeElement.click();      
		} else {
            this._error = null;
        }
	}

    onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

	async onOkClicked() {
        this._error = null!;      

        if (!this.isFormValid()) {
            return;
        }

        this._isProcessing = true;

        let model = new AddProductToCartRequest(
            this._myForm?.controls['name'].value,
            this.productElement.product.id,            
            this._myForm?.controls['quantity'].value
        )

        await this.businessService.addProductToCartAsync(model!)
            .then(r => {       
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });
        
        this._isProcessing = false;

        if (this._error == null) {
            this.closeModal.nativeElement.click();
            this.evtOk.emit(this._myForm?.controls['name'].value);
        }
	}

    isFormValid() {
        if (this._myForm?.invalid || this._myForm?.status === "INVALID" || this._myForm?.status === "PENDING") {
            Object.values(this._myForm.controls)
                .forEach(control => {
                    control.markAsTouched();
                });

            return false;
        }

        return true;
    }

    hasError(nameField: string, errorCode: string) {
        return this._myForm?.get(nameField)?.hasError(errorCode) && this._myForm?.get(nameField)?.touched;
    }

    getTotal() {
        let quantity = this._myForm?.controls['quantity'].value;
        let price = this.productElement.product.price;
        let total = Number(quantity) * Number(price);
        return total;
    }

    // onSetLastPersonSelected(person: string) {
    //     this._myForm?.controls['name'].setValue(person);
    // }

    onFocus(event: Event) {
		let input = (event.target as HTMLInputElement);
		input.select();
	}
}
