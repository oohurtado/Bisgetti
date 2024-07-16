export class AddOrRemoveElementRequest {
    constructor(
        public menuId: number|null,
        public categoryId: number|null,
        public productId: number|null,
        public action: string,
        public elementType: string
    ) { }
}