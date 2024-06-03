export interface INavigationOptionSelected {
    data: string;
}

export interface IOrderSelected {
    data: string;
    isAscending: boolean;
}

export interface IOrder {
    list: IDropDownList[];
    startPosition: number;
    isAscending: boolean;
}

export interface IDropDownList {
    data: string;
    text: string;
    divider: boolean;
}

export interface IPageSelected {
    from: number;
    to: number;
    total: number;
}