export class AddProductToCartRequest {
    constructor(
        public personName: string,
        public productId: number,        
        public productPrice: number,
        public productQuantity: number) { }
}