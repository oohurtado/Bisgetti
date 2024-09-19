export class CreateOrderForCustomerRequest {
    constructor(
        public payingWith: number,
        public comments: string|null,
        public deliveryMethod: string,
        public tipPercent: number,        
        public shippingCost: number,
        public addressId: number|null,
        public cartElements: CreateOrderElementForCustomerRequest[]
    
    ) { 
        if (this.comments === '') {
            this.comments = null;
        }
    }
}

export class CreateOrderElementForCustomerRequest {
    constructor(
        public cartElementId: number,
        public productQuantity: number,
        public productPrice: number    
    ) { }
}