export class PasswordRecoveryRequest {
    constructor(
        public email: string,
        public url: string) { }
}