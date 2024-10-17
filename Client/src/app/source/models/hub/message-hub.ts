export class MessageHub {
    constructor(public userId: string, public message: string, public roleFrom: string, public roleTo: string, public extraData: string) { }
}