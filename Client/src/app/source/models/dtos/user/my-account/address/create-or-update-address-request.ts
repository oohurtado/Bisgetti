export class CreateOrUpdateAddressRequest {
    constructor(
        public name: string,
        public country: string,
        public state: string,
        public city: string,
        public suburb: string,
        public street: string,
        public exteriorNumber: string,
        public interiorNumber: string,
        public postalCode: string,
        public moreInstructions: string,
        public phoneNumber: string        
    ) { }
}