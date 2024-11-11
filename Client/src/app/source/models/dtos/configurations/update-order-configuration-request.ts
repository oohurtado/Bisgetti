export class UpdateOrderConfigurationRequest {
    constructor(
        public tip: string,
        public shipping: string,
        public active: boolean
    ) {
    }
}
