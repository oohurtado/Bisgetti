import { CategoryResponse } from "../../dtos/entities/category-response";
import { MenuResponse } from "../../dtos/entities/menu-response";
import { MenuStuffResponse } from "../../dtos/entities/menu-stuff-response";
import { ProductResponse } from "../../dtos/entities/product-response";

export class MenuElement extends MenuStuffResponse {
    text!: string;
    css!: string;
    isMouseOverElement!: boolean;

    menu!: MenuResponse;
    category!: CategoryResponse;
    product!: ProductResponse;
}