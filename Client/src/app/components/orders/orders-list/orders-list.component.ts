import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../../source/models/dtos/entities/order-response';
import { PageBase } from '../../../source/page-base';
import { BusinessService } from '../../../services/business/business.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';
import { Utils } from '../../../source/utils';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent extends PageBase<OrderResponse> implements OnInit {

	constructor(
		private businessService: BusinessService,
		private router: Router,
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
}
