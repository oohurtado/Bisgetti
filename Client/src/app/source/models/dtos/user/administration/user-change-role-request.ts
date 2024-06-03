export class UserChangeRoleRequest {
    constructor(
        public id: string,
        public email: string,
        public role: string,
    ) { }
}