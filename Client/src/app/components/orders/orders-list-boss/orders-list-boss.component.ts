import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatusCustomerForDeliveryPipe } from '../../../pipes/order-status-customer-for-delivery.pipe';
import { OrderStatusCustomerTakeAwayPipe } from '../../../pipes/order-status-customer-take-away.pipe';
import { BusinessService } from '../../../services/business/business.service';
import { DateService } from '../../../services/common/date.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { general } from '../../../source/common/general';
import { Grouping } from '../../../source/models/common/grouping';
import { Tuple3, Tuple4 } from '../../../source/models/common/tuple';
import { OrderElementResponse } from '../../../source/models/dtos/entities/order-element-response';
import { OrderResponse } from '../../../source/models/dtos/entities/order-response';
import { OrderStatusResponse } from '../../../source/models/dtos/entities/order-status-response';
import { PageBase } from '../../../source/common/page-base';
import { Utils } from '../../../source/common/utils';
import { OrderHelper } from '../../../source/helpers/order-helper';
import { OrderChangeStatusRequest } from '../../../source/models/dtos/business/order-change-status-request';
import { EnumOrderStatus } from '../../../source/models/enums/order-status-enum';
import * as lodash from 'lodash';
declare let alertify: any;

@Component({
  selector: 'app-orders-list-boss',
  templateUrl: './orders-list-boss.component.html',
  styleUrl: './orders-list-boss.component.css'
})
export class OrdersListBossComponent extends PageBase<OrderResponse> implements OnInit {

    _filter: string;
	_filterMenu: Tuple4<string, string, boolean, boolean>[] = []; // data, text, enabled, selected

	constructor(
		private businessService: BusinessService,
		private router: Router,		
		public dateService: DateService,
		localStorageService: LocalStorageService
	) {
		super('orders', localStorageService);

		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Recibido,Aceptado,Cancelado,Declinado,Cocinando,Listo,En Ruta,Entregado','Todos', true, true));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Recibido','Recibido', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Cancelado,Declinado','Cancelado / Declinado', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Aceptado','Aceptado', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Cocinando','Cocinando', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Listo','Listo', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('En Ruta','En Ruta', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Entregado','Entregado', true, false));		
		this._filter = this._filterMenu[0].param1;
	}

    async ngOnInit() {
		await this.getDataAsync();
	}

    override async getDataAsync() {
		this._error = null;
		this._isProcessing = true;	
		await this.businessService
			.order_getOrdersByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, this._filter)
			.then(p => {	
				p.data.forEach(q => this.fixOrder(q))
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

	fixOrder(order: OrderResponse) {
		order._orderElementsGrouped = lodash.map(lodash.groupBy(order.orderElements, p => p.personName), (data, key) => {
			let info: Grouping<string, OrderElementResponse> = new Grouping<string, OrderElementResponse>();
			info.key = key;
			info.items = data
			
			return info;
		});
		
		order.orderStatuses = lodash.sortBy(order.orderStatuses, p => p.eventAt);
		order.orderStatuses = lodash.reverse(order.orderStatuses);
	}

	getTotalByPerson(products: OrderElementResponse[]) {
		let sum = 0;
		products.forEach(p => sum += p.productPrice * p.productQuantity);
		return sum;
	}

	async onFilterClicked(filter: string) {
		this._filterMenu.forEach(p => {
			p.param4 = false;

			if (p.param1 === filter) {
				p.param4 = true;
				this._filter = filter;
			}
		});

		await this.getDataAsync();
	}

	getNextStatus(order: OrderResponse) : string {
		return OrderHelper.nextStep(order.status, order.deliveryMethod);
	}

	async onCancelOrderClicked(order: OrderResponse) {
		this._error = null;
		this._isProcessing = true;
		
		let model = new OrderChangeStatusRequest(order.status)
		await this.businessService.order_canceledAsync(order.id, model)
			.then(p => {	
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		await this.businessService.order_getOrderAsync(order.id)
			.then(p => {	
				order = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		this.updateElement(order);
		this._isProcessing = false;
	}

	async onDeclineOrderClicked(order: OrderResponse) {
		this._error = null;
		this._isProcessing = true;
		
		let model = new OrderChangeStatusRequest(order.status)
		await this.businessService.order_declinedAsync(order.id, model)
			.then(p => {	
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		await this.businessService.order_getOrderAsync(order.id)
			.then(p => {	
				order = p;
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		this.updateElement(order);
		this._isProcessing = false;
	}

	async onNextStatusClicked(order: OrderResponse) {
		this._error = null;
		this._isProcessing = true;
		
		let model = new OrderChangeStatusRequest(order.status)
		await this.businessService.order_nextStepAsync(order.id, model)
			.then(p => {	
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		await this.businessService.order_getOrderAsync(order.id)
			.then(p => {	
				order = p;				
			})
			.catch(e => {
				this._error = Utils.getErrorsResponse(e);				
			});

		this.updateElement(order);
		this._isProcessing = false;
	}

	updateElement(order: OrderResponse) {		
		// actualiza orden
		/*				
		this.fixOrder(order);
		let indexToUpdate = this._pageData.data.findIndex(p => p.id == order.id);
		this._pageData.data[indexToUpdate] = order;
		*/
		
		// borra elemento
		/*
		let indexToDelete = this._pageData.data.findIndex(p => p.id == order.id);
		this._pageData.data.splice(indexToDelete, 1);		
		*/

		this.onSyncClicked();
	}

	isOrderActive(order: OrderResponse) : boolean {
		if (order.status == EnumOrderStatus.Canceled || order.status == EnumOrderStatus.Declined || order.status == EnumOrderStatus.Delivered) {
			return false;
		} else {
			return true;
		}		
	}

	canUserChangeStatus(order: OrderResponse) {
		return OrderHelper.canUserChangeStatus(order, this.localStorageService);
	}
}
