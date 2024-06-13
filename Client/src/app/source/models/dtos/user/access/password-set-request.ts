export class PasswordSetRequest {
    constructor(
        public email: string,
        public newPassword: string,
        public token: string) { }
}