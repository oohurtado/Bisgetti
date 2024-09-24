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
import { SharedService } from '../../../services/common/shared.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

	constructor(public localStorageService: LocalStorageService) { }    
}
