import { IDropDownList } from "../drop-down-list.interface";

export interface INavigation {
    options: IDropDownList[];
    back: boolean;
    home: boolean;
}

