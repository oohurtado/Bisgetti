import { Grouping } from "../../common/grouping";
import { AddressResponse } from "./address-response";
import { OrderElementResponse } from "./order-element-response";
import { OrderStatusResponse } from "./order-status-response";

export class OrderResponse {
    id!: number;
    deliveryMethod!: string;
    createdAt!: Date;
    updatedAt!: Date;
    comments!: string;
    tipPercent!: number;
    payingWith!: number;
    productTotal!: number;
    productCount!: number;
    shippingCost!: number;
    addressName!: string;
    address!: AddressResponse;
    status!: string;
    orderStatuses!: OrderStatusResponse[];
    orderElements!: OrderElementResponse[];

    _cols: string = "col-md-12";
    _detailsLoaded!: boolean;
    _orderElementsGrouped: Grouping<string, OrderElementResponse>[] = [];
}