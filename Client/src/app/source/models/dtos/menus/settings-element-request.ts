export class SettingsElementRequest {
    constructor(
        public menuId: number|null,
        public categoryId: number|null,
        public productId: number|null,
        public isVisible: boolean|null,
        public isAvailable: boolean|null
    ) { }
}