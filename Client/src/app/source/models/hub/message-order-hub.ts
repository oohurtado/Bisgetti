export class MessageOrderHub {
    constructor(public userId: string, public message: string, public roleFrom: string, public roleTo: string, public extraData: string, public statusFrom: string, public statusTo: string) { }
}