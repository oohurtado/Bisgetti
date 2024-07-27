import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/menu-element';
import { MenuStuffService } from '../../../../../../services/business/menu-stuff.service';

@Component({
    selector: 'app-update-element-image',
    templateUrl: './update-element-image.component.html',
    styleUrl: './update-element-image.component.css'
})
export class UpdateElementImageComponent implements OnChanges, OnInit {
    @Input() element!: MenuElement;
    @Input() open!: boolean;

    @ViewChild('openModal', { static: true }) openModal!: ElementRef;
    @ViewChild('closeModal', { static: true }) closeModal!: ElementRef;

    @Output() evtOk!: EventEmitter<void>;
    @Output() evtClose!: EventEmitter<void>;

    _isProcessing: boolean = false;
    _isProcessingExtra: boolean = false;
    _error!: string | null;

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
    }

    onCloseClicked(): void {
        this.closeModal.nativeElement.click();
		this.evtClose.emit();
	}

    async onOkClicked() {
	}
}
