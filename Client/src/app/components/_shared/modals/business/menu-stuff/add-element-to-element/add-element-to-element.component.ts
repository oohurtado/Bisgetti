import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Tuple2, Tuple3 } from '../../../../../../source/models/common/tuple';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import * as lodash from 'lodash';
import { BusinessService } from '../../../../../../services/business/business.service';
import { AddOrRemoveElementRequest } from '../../../../../../source/models/dtos/menus/add-or-remove-element-request';
import { Utils } from '../../../../../../source/utils';

@Component({
    selector: 'app-add-element-to-element',
    templateUrl: './add-element-to-element.component.html',
    styleUrl: './add-element-to-element.component.css'
})
export class AddElementToElementComponent implements OnChanges, OnInit {

    @Input() elements!: Tuple2<number,string>[]; // id element, text element
    @Input() element!: MenuElement;
    @Input() open!: boolean;

    @ViewChild('openModal', { static: true }) openModal!: ElementRef;
    @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

    @Output() evtOk!: EventEmitter<void>;
	@Output() evtClose!: EventEmitter<void>;
    
    ids: number[] = [];
    
    _isProcessing: boolean = false;
    _error!: string|null;

	constructor(
        private businessService: BusinessService
    ) {
		this.evtOk = new EventEmitter<void>();
		this.evtClose = new EventEmitter<void>();

        this.elements = [];
        this.ids = [];
        this._error = null;
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.open = changes['open']?.currentValue;
		
		if (this.open) {            
            this.openModal.nativeElement.click();      
            this.elements = lodash.sortBy(this.elements, p => p.param2);
		} else {
            this.elements = [];
            this.ids = [];
            this._error = null;
        }
	}

	onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

	async onOkClicked() {
        this._error = null!;

        if (this.ids.length == 0) {
            this.closeModal.nativeElement.click();
            return;            
        }

        this._isProcessing = true;
        for(let id of this.ids) {
            let model: AddOrRemoveElementRequest;
            if (this.element.categoryId == null) {
                model = new AddOrRemoveElementRequest(this.element.menuId, id, this.element.productId, "add");
            } else if (this.element.categoryId != null) {
                model = new AddOrRemoveElementRequest(this.element.menuId, this.element.categoryId, id, "add");
            }            
            await this.businessService.addOrRemoveElementAsync(model!)
                .then(r => {       
                }, e => {
                    this._error = Utils.getErrorsResponse(e);
                });
        }
        this._isProcessing = false;

        if (this._error == null) {
            this.closeModal.nativeElement.click();
            this.evtOk.emit();
        }
	}

    onChangeStatus(event:Event){
        let isChecked = (<HTMLInputElement>event.target).checked;
        let value = (<HTMLInputElement>event.target).value;

        if (isChecked) {
            this.ids.push(+value);
        } else {
            this.ids = this.ids.filter(p => p != (+value));
        }
    }
}
