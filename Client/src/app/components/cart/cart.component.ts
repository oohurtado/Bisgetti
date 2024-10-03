import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/business/business.service';
import { SharedService } from '../../services/common/shared.service';
import { Utils } from '../../source/common/utils';
import { CartElementResponse } from '../../source/models/dtos/entities/cart-element-response';
import { AddressResponse } from '../../source/models/dtos/entities/address-response';
declare let alertify: any;
import * as lodash from 'lodash';
import { Grouping } from '../../source/models/common/grouping';
import { LocalStorageService } from '../../services/common/local-storage.service';
import { UpdateProductFromCartRequest } from '../../source/models/dtos/business/update-product-from-cart-request';
import { Tuple2 } from '../../source/models/common/tuple';
import { CartDetails } from '../../source/models/business/common/cart-details';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { general } from '../../source/common/general';
import { MessageHub } from '../../source/models/hub/message-hub';

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

	_cartDetails!: CartDetails|null;

	private _connection!: HubConnection;

	constructor(
		private businessService: BusinessService,		
		private sharedService: SharedService,
		private localStorageService: LocalStorageService,
		private router: Router
	) {		
		this.initTabs();
		this.initHub();
	}

	async ngOnInit() {
		this._connection.start()
		.then(_ => {
			// console.log('connection Started');
		}).catch(error => {			
			// return console.error(error);
		});
	}

	initTabs() {
		this._tabLabels.push("Carrito");
		this._tabLabels.push("Detalles");
		this._tabLabels.push("Envío");

		this._tabIcons.push("fa-cart-shopping");
		this._tabIcons.push("fa-list-check");
		this._tabIcons.push("fa-truck-fast");
	}

	initHub() {
		const options: IHttpConnectionOptions = {
			accessTokenFactory: () => {
				return this.localStorageService.getValue(general.LS_TOKEN)!;
			},
		};

		this._connection = new HubConnectionBuilder()
			.withUrl(general.HUB_NOTIFY_TO_RESTAURANT, options)
			.build();

		// this._connection.on("NewOrderReceived", (messageHub: MessageHub) => {
		// 	console.log("message received: ", messageHub);
		// });			
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
		alertify.error(error, 3)
	}

	async evtNextStep() {
		this._tabCurrent++;
		
		if (this._tabCurrent == 3) {
			this.notifyToRestaurant();
			this.router.navigateByUrl('/orders');
			await this.refreshCartAsync();
		}
	}

	evtCartDetails(cartDetails: CartDetails|null) {
		this._cartDetails = cartDetails;
	}

	async refreshCartAsync() {		
		await this.businessService.cart_getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this._error = Utils.getErrorsResponse(e);
			});
	}

	notifyToRestaurant() {
		let userId = this.localStorageService.getUserId();
		let message = new MessageHub(userId, "NEW-ORDER");
		
		this._connection.invoke('NewOrderReceived', message)
			.then(_ => { 				
				// console.log('message sent: ' + message.message); 
			});
	}
}
