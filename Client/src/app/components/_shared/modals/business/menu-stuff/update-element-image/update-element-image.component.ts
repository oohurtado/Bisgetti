import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MenuElement } from '../../../../../../source/models/business/common/menu-element';
import { BusinessService } from '../../../../../../services/business/business.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../../../../source/common/utils';
import { ImageElementResponse } from '../../../../../../source/models/dtos/menus/image-element-response';
import { ImageElementRequest } from '../../../../../../source/models/dtos/menus/image-element-request';

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

    _url!: ImageElementResponse;

    _myForm!: FormGroup;

    constructor(
        private businessService: BusinessService,
        private formBuilder: FormBuilder,
    ) {
        this.evtOk = new EventEmitter<void>();
        this.evtClose = new EventEmitter<void>();

        this._error = null;
    }

    ngOnInit(): void {
        this._myForm = this.formBuilder.group({
            picture: [null, [Validators.required]],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.open = changes['open']?.currentValue;

        if (this.open) {
            this.openModal.nativeElement.click();

            if (this.element.image !== null) {
                this.businessService.menuStuff_getElementImage(this.element.menuId, this.element.categoryId, this.element.productId)
                    .subscribe({
                        complete: () => {
                        },
                        error: (e: string) => {
                            this._error = Utils.getErrorsResponse(e);
                        },
                        next: (val) => {
                            this._url = val;
                        }
                    });
            }
        } else {
            this._error = null;
        }
    }

    onCloseClicked(): void {
        this.closeModal.nativeElement.click();
        this.evtClose.emit();
    }

    file!: File;
    onControlFileChanged(data: any) {
        let files = data.files as File[];
        this.file = files[0];
    }

    async onOkClicked() {
    
        if (!this.isFormValid()) {
            return;
        }

        this._error = null;
        this._isProcessing = true;

        let formData = new FormData();
        formData.append('file', this.file);        
        
        await this.businessService.menuStuff_updateElementImageAsync(formData, this.element.menuId, this.element.categoryId, this.element.productId)
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

    async onOkExtraClicked() {
        this._isProcessingExtra = true;

        let model = new ImageElementRequest(this.element.menuId, this.element.categoryId, this.element.productId);
        await this.businessService.menuStuff_deleteElementImageAsync(model)
            .then(r => {
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });

        this._isProcessingExtra = false;

        this.closeModal.nativeElement.click();
        this.evtOk.emit();        
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
}
