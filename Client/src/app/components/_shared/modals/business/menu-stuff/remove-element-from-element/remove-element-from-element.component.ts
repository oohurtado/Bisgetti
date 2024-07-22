import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import { MenuStuffService } from '../../../../../../services/business/menu-stuff.service';
import { AddOrRemoveElementRequest } from '../../../../../../source/models/dtos/menus/add-or-remove-element-request';
import { Utils } from '../../../../../../source/utils';

@Component({
  selector: 'app-remove-element-from-element',
  templateUrl: './remove-element-from-element.component.html',
  styleUrl: './remove-element-from-element.component.css'
})
export class RemoveElementFromElementComponent implements OnChanges, OnInit {
    
    @Input() element!: MenuElement;
    @Input() open!: boolean;
    
    @ViewChild('openModal', { static: true }) openModal!: ElementRef;
    @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;
    
    _textTitle: string = "Quitar elemento";
    _textDescription: string = "¿Deseas quitar el elemento del elemento?"
    _textBtnOk: string = "Aceptar";
    _textBtnClose: string = "Cancelar";

    @Output() evtOk!: EventEmitter<void>;
	@Output() evtClose!: EventEmitter<void>;
    
    _isProcessing: boolean = false;
    _error!: string|null;

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
    
        if (this.element.productId == null) {
            this._textTitle = "Quitar categoría del menú";
            this._textDescription = `¿Deseas quitar la categoría ${this.element.text} del menú?`;
        } else if (this.element.productId != null) {
            this._textTitle = "Quitar producto de la categoría";
            this._textDescription = `¿Deseas quitar el producto ${this.element.text} de la categoría?`;
        }  
    }

    onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

    async onOkClicked() {
        this._isProcessing = true;
            
        let model: AddOrRemoveElementRequest;
        model = new AddOrRemoveElementRequest(this.element.menuId, this.element.categoryId, this.element.productId, "remove");
        await this.menuStuffService.addOrRemoveElementAsync(model!)
            .then(r => {       
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;

        this.closeModal.nativeElement.click();
		this.evtOk.emit();
	}
}
