import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonResponse } from '../../../../../../source/models/business/responses/person-response';

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
    ) {
		this.evtOk = new EventEmitter<string>();
		this.evtClose = new EventEmitter<void>();
        this._error = null;
	}

    ngOnInit(): void {    
        this._myForm = this.formBuilder.group({
            name: [this.lastPersonSelected, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
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

        let name = this._myForm?.controls['name'].value;
        let quantity = this._myForm?.controls['quantity'].value;
        let productId = this.productElement.product.id;
        let productGuid = this.productElement.product.guid;

        console.log(name, quantity, productId, productGuid);
        
        this._isProcessing = false;

        if (this._error == null) {
            this.closeModal.nativeElement.click();
            this.evtOk.emit(name);
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
}
