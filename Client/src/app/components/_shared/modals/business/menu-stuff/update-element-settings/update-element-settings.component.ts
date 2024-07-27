import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import { MenuStuffService } from '../../../../../../services/business/menu-stuff.service';
import { AddOrRemoveElementRequest } from '../../../../../../source/models/dtos/menus/add-or-remove-element-request';
import { Utils } from '../../../../../../source/utils';
import { VisibilityElementRequest } from '../../../../../../source/models/dtos/menus/visibility-element-request';

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
        private menuStuffService: MenuStuffService
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
            this.init();
		} else {
            this._error = null;
        }
	}
    
    init() {
        this.openModal.nativeElement.click();

        this._isVisible = this.element.isVisible;
        this._isAvailable = this.element.isAvailable;
    }

	onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

	async onOkClicked() {
        this._isProcessing = true;
        
        let model = new VisibilityElementRequest(this.element.menuId, this.element.categoryId, this.element.productId, this._isVisible, this._isAvailable);
        await this.menuStuffService.updateElementVisibilityAsync(model!)
            .then(r => {       
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });

        this._isProcessing = false;

        this.closeModal.nativeElement.click();
		this.evtOk.emit();
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
