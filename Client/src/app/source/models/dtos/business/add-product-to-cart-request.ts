export class AddProductToCartRequest {
    constructor(
        public personName: string,
        public productId: number,
        public productGuid: string,
        public productPrice: number,
        public productQuantity: number) { }
}