import { CategoryResponse } from "./responses/category-response";
import { MenuResponse } from "./responses/menu-response";
import { MenuStuffResponse } from "./responses/menu-stuff-response";
import { ProductResponse } from "./responses/product-response";

export class MenuElement extends MenuStuffResponse {
    text!: string;
    css!: string;
    isMouseOverElement!: boolean;

    menu!: MenuResponse;
    category!: CategoryResponse;
    product!: ProductResponse;
}