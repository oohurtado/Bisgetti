export class CreateRequestForClientRequest {
    constructor(
        public payingWith: number,
        public comments: string,
        public deliveryMethod: string,
        public tipPercent: number,        
        public shippingCost: number,
        public addressId: number|null,
        public cartElements: CreateRequestElementForClientRequest[]
    
    ) { }
}

export class CreateRequestElementForClientRequest {
    constructor(
        public cartElementId: number,
        public productQuantity: number,
        public productPrice: number    
    ) { }
}