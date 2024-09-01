import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-cart-tab-details',
    templateUrl: './cart-tab-details.component.html',
    styleUrl: './cart-tab-details.component.css'
})
export class CartTabDetailsComponent {
    @Output() evtNextStep!: EventEmitter<void>;
    
    constructor() {
        this.evtNextStep = new EventEmitter<void>();
    }

    onNextStepClicked(event: Event) {
        this.evtNextStep.emit();		
	}
}
