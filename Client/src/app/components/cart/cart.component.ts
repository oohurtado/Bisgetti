import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { SharedService } from '../../services/common/shared.service';
import { Utils } from '../../source/utils';
import { CartElementResponse } from '../../source/models/business/responses/cart-element-response';
import { AddressResponse } from '../../source/models/business/responses/address-response';
declare let alertify: any;
import * as lodash from 'lodash';
import { Grouping } from '../../source/models/common/grouping';
import { LocalStorageService } from '../../services/common/local-storage.service';
import { UpdateProductFromCartRequest } from '../../source/models/dtos/business/update-product-from-cart-request';
import { Tuple2 } from '../../source/models/common/tuple';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
	
	_isProcessing: boolean = true;
    _error!: string|null;

	// tabs
	_tabCurrent: number = 0;
	_tabLabels: string[] = [];
	_tabIcons: string[] = [];

	_cartGrouped: Grouping<string, CartElementResponse>[] = [];
	_addresses : AddressResponse[] = [];

	constructor(
		private businessService: BusinessService,		
		private sharedService: SharedService
	) {		
	}

	async ngOnInit() {
		this.initTabs();
	}

	initTabs() {
		this._tabLabels.push("Carrito");
		this._tabLabels.push("Últimos detalles");
		this._tabLabels.push("Confirmación y Envío");

		this._tabIcons.push("fa-cart-shopping");
		this._tabIcons.push("fa-list-check");
		this._tabIcons.push("fa-truck-fast");
	}
	
	onTabClicked(event: Event, tabNew: number) {
		if (tabNew < this._tabCurrent) {
			this._tabCurrent = tabNew;
		}
	}

	evtProcessing(isProcessing:  boolean) {
		this._isProcessing = isProcessing;
	}

	evtError(error: string|null) {
		alertify.error(error, 1)
	}

	evtNextStep() {
		this._tabCurrent++;
	}

	evtCart(cartGrouped: Grouping<string, CartElementResponse>[]) {
		this._cartGrouped = cartGrouped;
	}	
}
