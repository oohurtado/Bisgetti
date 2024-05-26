import { IOrderSelected } from "../models/interfaces/list/order-selected.interface";
import { IOrder } from "../models/interfaces/list/order.interface";
import { INavigation } from "../models/interfaces/list/navigation.interface";

export class ListFactory {

    public static getOrder(section: string): IOrder {
        switch (section) {
            case 'admin-users':
                return this.adminUsersOrder;
        }

        throw new Error(`ListFactory: '${section}' not implemented.`);
    }

    public static getNavigation(section: string): INavigation {
        switch (section) {
            case 'admin-users':
                return this.adminUsersNavigation;
        }

        throw new Error(`ListFactory: '${section}' not implemented.`);
    }

    public static getOrderInit(order: IOrder): IOrderSelected {
        return {
            isAscending: order.isAscending,
            data: order.list[order.startPosition].data,
        };
    }

    //////////
    /* data */
    //////////

    private static adminUsersOrder: IOrder = {
        isAscending: true,
        startPosition: 0,
        list: [
            { data: "first-name", text: "Nombre", divider: false },
            { data: "last-name", text: "Apellido", divider: false },
            { data: "email", text: "Correo electrónico", divider: false },
        ],
    }

    private static adminUsersNavigation: INavigation = {
        home: true,
        back: false,
        options: [
            { data: "create", text: "Crear usuario", divider: false },
        ]
    }

}