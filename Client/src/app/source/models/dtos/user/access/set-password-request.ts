export class SetPasswordRequest {
    constructor(
        public email: string,
        public newPassword: string,
        public token: string) { }
}