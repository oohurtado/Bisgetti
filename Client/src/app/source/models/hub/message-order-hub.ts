export class MessageOrderHub {
    constructor(public userIdFrom: string, public userIdTo: string, public message: string, public roleFrom: string, public roleTo: string, public extraData: string, public statusFrom: string, public statusTo: string) { }
}