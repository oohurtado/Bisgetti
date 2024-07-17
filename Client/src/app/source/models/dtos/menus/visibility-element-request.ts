export class VisibilityElementRequest {
    constructor(
        public menuId: number|null,
        public categoryId: number|null,
        public productId: number|null,
        public isVisible: boolean|null,
        public isAvailable: boolean|null,
        public isSoldOut: boolean|null
    ) { }
}