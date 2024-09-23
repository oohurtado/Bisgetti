import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../../source/models/dtos/entities/order-response';
import { PageBase } from '../../../source/page-base';
import { BusinessService } from '../../../services/business/business.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Utils } from '../../../source/utils';
import { general } from '../../../source/general';
import { DateService } from '../../../services/common/date.service';
import * as lodash from 'lodash';
import { Grouping } from '../../../source/models/common/grouping';
import { OrderElementResponse } from '../../../source/models/dtos/entities/order-element-response';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent extends PageBase<OrderResponse> implements OnInit {

	constructor(
		private businessService: BusinessService,
		private router: Router,
		public dateService: DateService,
		localStorageService: LocalStorageService
	) {
		super('orders', localStorageService);
	}

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;		
		await this.businessService
			.order_getOrdersByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber)
			.then(p => {
				this._pageData = p;
				this.updatePage(p);
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});
		this._isProcessing = false;
    }

	override onCreateClicked(event: Event): void {
		throw new Error('Method not implemented.');
	}

	getTotal(order: OrderResponse) {
		let total = order.productTotal + ((order.productTotal * (order.tipPercent ?? 0)) / 100) + order.shippingCost;
		return total;
	}

	getTip(order: OrderResponse) {
		if (order.tipPercent == 0) {
			return 0;
		}

		let total = ((order.productTotal * (order.tipPercent ?? 0)) / 100);
		return total;
	}

	getComments(order: OrderResponse) {
		if (order.comments === '' || order.comments === null) {
			return '...';
		}

		return order.comments;
	}

	getAddress(order: OrderResponse) {
		return `${order.address.name}, ${order.address.street}, #${order.address.exteriorNumber} ${order.address.interiorNumber}, ${order.address.postalCode}`
	}

	onLoadOrderDetailsClicked(event: Event, order: OrderResponse) {
		this._isProcessing = true;		
		this.businessService.order_getOrderAsync(order.id)
			.then(p => {
				order.orderElements = p.orderElements;
				order.orderStatuses = p.orderStatuses;
				order._detailsLoaded = true;	
				
				order._orderElementsGrouped = lodash.map(lodash.groupBy(order.orderElements, p => p.personName), (data, key) => {
					let info: Grouping<string, OrderElementResponse> = new Grouping<string, OrderElementResponse>();
					info.key = key;
					info.items = data

					return info;
				});

				order._cols = "col-md-6";
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});
		this._isProcessing = false;
	}

	getTotalByPerson(products: OrderElementResponse[]) {
		let sum = 0;
		products.forEach(p => sum += p.productPrice * p.productQuantity);
		return sum;
	}
}
