import { Component, OnInit } from '@angular/core';
import { OrderResponse } from '../../../source/models/dtos/entities/order-response';
import { PageBase } from '../../../source/page-base';
import { BusinessService } from '../../../services/business/business.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/common/local-storage.service';

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

	ngOnInit(): void {
		throw new Error('Method not implemented.');
	}

	override onCreateClicked(event: Event): void {
		throw new Error('Method not implemented.');
	}

	override getDataAsync(): void {
		throw new Error('Method not implemented.');
	}
}
