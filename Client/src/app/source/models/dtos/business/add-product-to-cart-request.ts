export class AddProductToCartRequest {
    constructor(
        public personName: string,
        public productId: number,        
        public productQuantity: number) { }
}