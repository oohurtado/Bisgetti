import { IOrder, IOrderSelected } from "../models/interfaces/page.interface";

export class PageFactory {

    public static getOrder(section: string): IOrder {
        switch (section) {
            case 'admin-users':
                return {
                    isAscending: true,
                    startPosition: 0,
                    list: [
                        { data: "first-name", text: "Nombre", divider: false },
                        { data: "last-name", text: "Apellido", divider: false },
                        { data: "email", text: "Correo electrónico", divider: false },
                    ],
                }
        }

        throw new Error(`PageFactory: '${section}' not implemented.`);
    }

    public static getOrderInit(order: IOrder): IOrderSelected {
        return {
            isAscending: order.isAscending,
            data: order.list[order.startPosition].data,
        };
    }
}