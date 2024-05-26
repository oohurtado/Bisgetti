import { IDropDownList } from "../drop-down-list.interface";

export interface IOrder {
    list: IDropDownList[];
    startPosition: number;
    isAscending: boolean;
}