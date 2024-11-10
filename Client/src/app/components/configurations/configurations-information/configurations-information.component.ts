import { Component, OnInit } from '@angular/core';
import { FormBase } from '../../../source/common/form-base';
import { UpdateInformationConfigurationResponse } from '../../../source/models/dtos/configurations/update-information-configuration-response';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from '../../../services/business/business.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Utils } from '../../../source/common/utils';
import { UpdateInformationConfigurationRequest } from '../../../source/models/dtos/configurations/update-information-configuration-request';
declare let alertify: any;

@Component({
  selector: 'app-configurations-information',
  templateUrl: './configurations-information.component.html',
  styleUrl: './configurations-information.component.css'
})
export class ConfigurationsInformationComponent extends FormBase implements OnInit {

    _config: UpdateInformationConfigurationResponse|null = null;

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
            .configuration_getInformationAsync()
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
      		this._myForm = this.formBuilder.group({
            name: [this._config?.name, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
			phone: [this._config?.phone, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
            address: [this._config?.address, [Validators.required, Validators.minLength(1), Validators.maxLength(250)]],
            openingDaysHours: [this._config?.openingDaysHours, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
		});
    }

    onDoneClicked() {
		this._error = null!;
		if (!this.isFormValid()) {
			return;
		}
		
		this._isProcessing = true;

        let model = new UpdateInformationConfigurationRequest(
			this._myForm?.controls['name'].value, 
            this._myForm?.controls['address'].value, 
            this._myForm?.controls['phone'].value, 
			this._myForm?.controls['openingDaysHours'].value	
        );

        this.businessService.configuration_updateInformation(model)
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
