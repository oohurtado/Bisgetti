import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Tuple2, Tuple3 } from '../../../../../../source/models/common/tuple';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import * as lodash from 'lodash';

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

    _textTitle: string = "Agregar elemento";
    _textDescription: string = "Elementos disponibles"
    _textNoData: string = "No hay elementos disponibles";
    _textBtnOk: string = "Aceptar";
    _textBtnClose: string = "Cancelar";

    @Output() evtOk!: EventEmitter<number[]>;
	@Output() evtClose!: EventEmitter<void>;
    
    ids: number[] = [];

	constructor() {
		this.evtOk = new EventEmitter<number[]>();
		this.evtClose = new EventEmitter();

        this.elements = [];
	}

	ngOnInit(): void {		
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.open = changes['open']?.currentValue;
		
		if (this.open) {            
            this.init();
		}
	}
    
    init() {
        this.openModal.nativeElement.click();
    
        if (this.element.categoryId == null) {
            this._textTitle = "Agregar elemento a menú";
            this._textDescription = "Categorías disponibles:";
            this._textNoData = "No hay categorías disponibles";
        } else if (this.element.categoryId != null) {
            this._textTitle = "Agregar elemento a categoría";
            this._textDescription = "Productos disponibles:";
            this._textNoData = "No hay productos disponibles";
        }  
        
        this.elements = lodash.sortBy(this.elements, p => p.param2);
    }

	onCloseClicked(): void {
		this.evtClose.emit();
	}

	onOkClicked(): void {
		this.evtOk.emit(this.ids);
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
