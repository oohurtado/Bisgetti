import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/common/form-base';
import { BusinessService } from '../../../services/business/business.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { UpdateOrderConfigurationResponse } from '../../../source/models/dtos/configurations/update-order-configuration-response';
import { Utils } from '../../../source/common/utils';
import { UpdateOrderConfigurationRequest } from '../../../source/models/dtos/configurations/update-order-configuration-request';
declare let alertify: any;

@Component({
    selector: 'app-configurations-orders',
    templateUrl: './configurations-orders.component.html',
    styleUrl: './configurations-orders.component.css'
})
export class ConfigurationsOrdersComponent extends FormBase implements OnInit {

    _config: UpdateOrderConfigurationResponse|null = null;
    _active: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
		private router: Router,		
		private businessService: BusinessService,
		private localStorageService: LocalStorageService
    ) {
        super(); 				
    }

    async ngOnInit() {        
        await this.getDataAsync();
        await this.setupFormAsync();
    }

    async getDataAsync() {
		this._error = null;
        this._isLoading = true;
        await this.businessService
            .configuration_getOrdersAsync()
            .then(p => {
				this._config = p;
                this._isLoading = false;
			})
			.catch(e => {
                this._error = Utils.getErrorsResponse(e);	
				this._isLoading = false;
			});
    }

    override setupFormAsync(): void {
        let tip = this._config?.tip;
        let shipping = parseInt(this._config?.shipping ?? '0');
        this._active = this._config?.active?.toLowerCase() == "true";

		this._myForm = this.formBuilder.group({
            tip: [tip, [Validators.required, Validators.minLength(1), Validators.maxLength(100), Validators.pattern('^[0-9]{1,2}(?:,[0-9]{1,2})*$')]],
			shipping: [shipping, [Validators.required, Validators.min(0)]],
		});
    }

    onChangeStatus(event:Event){
        let id = (<HTMLInputElement>event.target).id;
        let isChecked = (<HTMLInputElement>event.target).checked;
        let value = (<HTMLInputElement>event.target).value;
        
        if (id === "active") {
            this._active = isChecked;            
        }
    }

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new UpdateOrderConfigurationRequest(
			this._myForm?.controls['tip'].value, 
			this._myForm?.controls['shipping'].value, 
			this._active ? 'true' : 'false',
        );

        this.businessService.configuration_updateOrders(model)
			.subscribe({
				complete: () => {
					this._isProcessing = false;
				},
				error: (e : string) => {
					this._isProcessing = false;
					this._error = Utils.getErrorsResponse(e);;
				},
				next: (val) => {
					this.router.navigateByUrl('/configurations');
					alertify.message("Cambios guardados", 1);
				}
			});
	}
}
