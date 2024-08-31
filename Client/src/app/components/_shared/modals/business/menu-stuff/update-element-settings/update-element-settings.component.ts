import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/common/menu-element';
import { BusinessService } from '../../../../../../services/business/business.service';
import { AddOrRemoveElementRequest } from '../../../../../../source/models/dtos/menus/add-or-remove-element-request';
import { Utils } from '../../../../../../source/utils';
import { SettingsElementRequest } from '../../../../../../source/models/dtos/menus/settings-element-request';

@Component({
    selector: 'app-update-element-settings',
    templateUrl: './update-element-settings.component.html',
    styleUrl: './update-element-settings.component.css'
})
export class UpdateElementSettingsComponent implements OnChanges, OnInit {
    
    @Input() element!: MenuElement;
    @Input() open!: boolean;

    @ViewChild('openModal', { static: true }) openModal!: ElementRef;
    @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

    @Output() evtOk!: EventEmitter<void>;
	@Output() evtClose!: EventEmitter<void>;
    
    _isProcessing: boolean = false;
    _error!: string|null;

    _isVisible: boolean = false;
    _isAvailable: boolean = false;

    constructor(
        private businessService: BusinessService
    ) {
		this.evtOk = new EventEmitter<void>();
		this.evtClose = new EventEmitter<void>();

        this._error = null;
	}

    ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.open = changes['open']?.currentValue;
		
		if (this.open) {            
            this.openModal.nativeElement.click();

            this._isVisible = this.element.isVisible;
            this._isAvailable = this.element.isAvailable;
		} else {
            this._error = null;
        }
	}
    
	onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

	async onOkClicked() {
        this._error = null;
        this._isProcessing = true;
        
        let model = new SettingsElementRequest(this.element.menuId, this.element.categoryId, this.element.productId, this._isVisible, this._isAvailable);
        await this.businessService.menuStuff_updateElementSettingsAsync(model!)
            .then(r => {       
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });

        this._isProcessing = false;

        if (this._error == null) {
            this.closeModal.nativeElement.click();
            this.evtOk.emit();
        }
	}

    onChangeStatus(event:Event){
        let id = (<HTMLInputElement>event.target).id;
        let isChecked = (<HTMLInputElement>event.target).checked;
        let value = (<HTMLInputElement>event.target).value;
        
        if (id === "visible") {
            this._isVisible = isChecked;            
        } else if (id === "available") {
            this._isAvailable = isChecked;            
        }
    }
}
