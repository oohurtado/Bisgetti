export class UpdateProductFromCartRequest {
    constructor(
        public personName: string,
        public productId: number,        
        public productQuantity: number) { }
}