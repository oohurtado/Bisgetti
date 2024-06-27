export class ChangeRoleRequest {
    constructor(
        public id: string,
        public email: string,
        public role: string,
        public url: string
    ) { }
}