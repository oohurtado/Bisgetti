import { IOrder, IOrderSelected } from "../models/interfaces/page.interface";

export class PageFactory {

    public static getOrder(section: string): IOrder {
        switch (section) {
            case 'users':
                return {
                    isAscending: true,
                    startPosition: 0,
                    list: [
                        { data: "first-name", text: "Nombre", divider: false },
                        { data: "last-name", text: "Apellido", divider: false },
                        { data: "email", text: "Correo electrónico", divider: false },
                    ],
                }
            case 'menus':
                return {
                    isAscending: true,
                    startPosition: 0,
                    list: [
                        { data: "name", text: "Nombre", divider: false },
                    ],
                }   
            case 'categories':
                return {
                    isAscending: true,
                    startPosition: 0,
                    list: [
                        { data: "name", text: "Nombre", divider: false },
                    ],
                } 
            case 'products':
                return {
                    isAscending: true,
                    startPosition: 0,
                    list: [
                        { data: "name", text: "Nombre", divider: false },
                        { data: "price", text: "Precio", divider: false },
                    ],
                }    
            case 'orders':
                return {
                    isAscending: false,
                    startPosition: 0,
                    list: [
                        { data: "event", text: "Fecha", divider: false },
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