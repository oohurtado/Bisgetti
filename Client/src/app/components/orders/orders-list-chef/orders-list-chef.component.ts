import { Component, OnInit } from '@angular/core';
import { PageBase } from '../../../source/common/page-base';
import { OrderResponse } from '../../../source/models/dtos/entities/order-response';
import { Tuple4 } from '../../../source/models/common/tuple';
import { Router } from '@angular/router';
import { BusinessService } from '../../../services/business/business.service';
import { DateService } from '../../../services/common/date.service';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Utils } from '../../../source/common/utils';
import * as lodash from 'lodash';
import { Grouping } from '../../../source/models/common/grouping';
import { OrderElementResponse } from '../../../source/models/dtos/entities/order-element-response';
declare let alertify: any;

@Component({
  selector: 'app-orders-list-chef',
  templateUrl: './orders-list-chef.component.html',
  styleUrl: './orders-list-chef.component.css'
})
export class OrdersListChefComponent extends PageBase<OrderResponse> implements OnInit {

    _filter: string;
	_filterMenu: Tuple4<string, string, boolean, boolean>[] = []; // data, text, enabled, selected
    
	constructor(
		private businessService: BusinessService,
		private router: Router,		
		public dateService: DateService,
		localStorageService: LocalStorageService
	) {
		super('orders', localStorageService);

        this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Aceptado,Cocinando,Listo,Entregado','Todos', true, true));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Cocinando,Listo','En Proceso', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Cancelado,Declinado','Otros', true, false));
		this._filterMenu.push(new Tuple4<string, string, boolean, boolean>('Entregado','Entregados', true, false));
		this._filter = this._filterMenu[0].param1;
	}

    override onCreateClicked(event: Event): void {
        throw new Error('Method not implemented.');
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
}
