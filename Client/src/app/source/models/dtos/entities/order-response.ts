export class OrderResponse {
    id!: number;
    deliveryMethod!: string;
    createdAt!: Date;
    comments!: string;
    tipPercent!: number;
    payingWith!: number;
    productTotal!: number;
    productCount!: number;
    shippingCost!: number;
    addressName!: string;
    status!: string;
    personNames!: string[];
}