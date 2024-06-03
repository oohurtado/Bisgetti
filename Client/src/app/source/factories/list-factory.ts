import { IOrder, INavigation, IOrderSelected } from "../models/interfaces/page.interface";

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
            case 'home-true,back-true':
                return this.homeTrueBackTrueNavigation;
            case 'home-true':
                return this.homeTrueNavigation;
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

    private static homeTrueBackTrueNavigation: INavigation = {
        home: true,
        back: true,
        options: [            
        ]
    }

    private static homeTrueNavigation: INavigation = {
        home: true,
        back: false,
        options: [            
        ]
    }

}