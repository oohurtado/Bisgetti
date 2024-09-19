export class CreateOrderForClientRequest {
    constructor(
        public payingWith: number,
        public comments: string,
        public deliveryMethod: string,
        public tipPercent: number,        
        public shippingCost: number,
        public addressId: number|null,
        public cartElements: CreateOrderElementForClientRequest[]
    
    ) { }
}

export class CreateOrderElementForClientRequest {
    constructor(
        public cartElementId: number,
        public productQuantity: number,
        public productPrice: number    
    ) { }
}