export class UserChangePasswordRequest {
    constructor(
        public currentPassword: string,
        public newPassword: string) { }
}