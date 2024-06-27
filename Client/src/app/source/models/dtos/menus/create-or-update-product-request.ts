export class CreateOrUpdateProductRequest {
    constructor(
        public name: string,
        public description: string,
        public ingredients: string,
        public price: number,
    ) { }
}