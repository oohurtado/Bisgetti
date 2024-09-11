import { MenuElement } from "./models/business/common/menu-element";
import { CategoryResponse } from "./models/dtos/entities/category-response";
import { MenuResponse } from "./models/dtos/entities/menu-response";
import { MenuStuffResponse } from "./models/dtos/entities/menu-stuff-response";
import { ProductResponse } from "./models/dtos/entities/product-response";
import * as lodash from 'lodash';

export class MenuHelper {

    private _menuId!: number | null;
    private _menu!: MenuResponse | null;
    private _menuStuff!: MenuStuffResponse[] | null;
    private _categories!: CategoryResponse[] | null;
    private _products!: ProductResponse[] | null;
    private _data: MenuElement[];

    constructor() {
        this._menuId = null;
        this._menu = null;
        this._menuStuff = [];
        this._categories = [];
        this._products = [];
        this._data = []; 
    }

    setData(
        menuId: number | null, 
        menu: MenuResponse | null, 
        categories: CategoryResponse[] | null, 
        products: ProductResponse[] | null, 
        menuStuff: MenuStuffResponse[] | null) {
        this._menuId = menuId;
        this._menu = menu;
        this._categories = categories;
        this._products = products;
        this._menuStuff = menuStuff;
    }

    buildMenu() : MenuElement[] {
        this._data = [];
        let menu: MenuElement;
        let categories: MenuElement[];
        let products: MenuElement[];

        // obtenemos menu de menu stuff
        menu = this.getMenuFromMenuStuff();        
        this._data?.push(menu);

        // categorias
        categories = this.getCategoriesFromMenuStuff();
        this._data = this._data?.concat(categories);

        // productos
        categories.forEach(p => {
            products = this.getProductsFromMenuStuff(p.categoryId);
            let index = this._data?.findIndex(q => q.categoryId == p.categoryId) ?? 0;
            this._data?.splice(index + 1, 0, ...products)
        });

        return this._data;
    }

    private getMenuFromMenuStuff() : MenuElement {
        // obtenemos el elemento menu de menustuff
        let tmpStuffElement = this._menuStuff?.filter(p => p.categoryId == null && p.productId == null)[0];
        let element = Object.assign(new MenuElement(), tmpStuffElement);
        element.menu = this._menu!;
        return element;
    }

    private getCategoriesFromMenuStuff() : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos categorias de menustuff y ordenamos        
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId != null && p.productId == null);
        tmpStuffElements = lodash.sortBy(tmpStuffElements, p => p.position);

        // iteramos
        tmpStuffElements.forEach(p => {
            let category = this._categories?.filter(q => q.id == p.categoryId)[0];
            let element = Object.assign(new MenuElement(), p);
            element.category = category!;
            elements.push(element);
        });     
            
        return elements;
    }

    private getProductsFromMenuStuff(categoryId: number) : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos productos de x categoria de menustuff y ordenamos
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId == categoryId && p.productId != null);
        tmpStuffElements = lodash.sortBy(tmpStuffElements, p => p.position);

        // iteramos
        tmpStuffElements.forEach(p => {
            let product = this._products?.filter(q => q.id == p.productId)[0];
            let element = Object.assign(new MenuElement(), p);
            element.product = product!;
            elements.push(element);
        });     
            
        return elements;
    }

    getMenuElement() : MenuElement | null {
        let menu = this._data?.at(0); 
        return menu!;
    }

    getMenu() : MenuResponse | null {
        return this._menu;
    }

    getCategoryElements() : MenuElement[] | undefined {
        let categories = this._data?.filter(p => p.categoryId != null && p.productId == null); 

        if (categories?.length == 0) {
            return [];
        }
        
        return categories;
    }

    getCategories() : CategoryResponse[] | null {
        return this._categories;
    }

    getProductElements(categoryId: number) : MenuElement[] | undefined {
        let products = this._data?.filter(p => p.categoryId ==categoryId && p.productId != null); 

        if (products?.length == 0) {
            return [];
        }
        
        return products;
    }

    getProducts() : ProductResponse[] | null {
        return this._products;
    }
}