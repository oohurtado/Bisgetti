export class MoveElementRequest {
    constructor(
        public menuId: number|null,
        public categoryId: number|null,
        public productId: number|null,
        public action: string // move-up/move-down
    ) { }
}