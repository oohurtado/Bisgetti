export class UpdateInformationConfigurationRequest {
    constructor(
        public name: string,
        public address: string,
        public phone: string,
        public openingDaysHours: number
    ) {
    }
}
