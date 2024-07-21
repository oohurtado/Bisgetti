import { Component, OnInit } from '@angular/core';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { Utils } from '../../../../../source/utils';
import { ActivatedRoute } from '@angular/router';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { MenuStuffResponse } from '../../../../../source/models/business/responses/menu-stuff-response';
import { CategoryResponse } from '../../../../../source/models/business/responses/category-response';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { MenuElement } from '../../../../../source/models/business/menu-element';
import * as lodash from 'lodash';
import { Tuple2 } from '../../../../../source/models/common/tuple';

@Component({
    selector: 'app-menus-builder',
    templateUrl: './menus-builder.component.html',
    styleUrl: './menus-builder.component.css'
})
export class MenusBuilderComponent implements OnInit {

    _error: string | null = null;
    _isProcessing: boolean = false;

    _menuId!: number | null;
    _menu!: MenuResponse | null;
    _menuStuff!: MenuStuffResponse[] | null;
    _categories!: CategoryResponse[] | null;
    _products!: ProductResponse[] | null;

    _data!: MenuElement[] | null;

    
    modal_availableElements!: Tuple2<number,string>[]; // id element, text element // para usar en modal, pueden ser categorias o productos que aun no se estan usando, y pueden ser asignados
    modal_parentId!: number;
    modal_parentText!: string;


    constructor(
        private menuStuffService: MenuStuffService,
        private activatedRoute: ActivatedRoute,
    ) {
        this._menuId = null;
        this._menu = null;
        this._menuStuff = [];
        this._categories = [];
        this._products = [];
        this._data = [];
    }

    async ngOnInit() {
        await this.setUrlParametersAsync();
    }

    async setUrlParametersAsync() {
        this.activatedRoute.params.subscribe(async params => {
            this._menuId = params['id'];
            if (this._menuId !== null && this._menuId !== undefined) {
                await this.getDataAsync();
            }
        });
    }

    async getDataAsync() {
        this._isProcessing = true;
        await Promise.all([this.menuStuffService.getMenuAsync(this._menuId ?? 0), this.menuStuffService.getMenuStuffAsync(this._menuId ?? 0), this.menuStuffService.getCategoriesAsync(), this.menuStuffService.getProductsAsync()])
            .then(r => {
                this._menu = r[0] as MenuResponse;
                this._menuStuff = r[1] as MenuStuffResponse[];
                this._categories = r[2] as CategoryResponse[];
                this._products = r[3] as ProductResponse[];
                this.buildMenu();
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;
    }



    buildMenu() {
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
    }

    getMenuFromMenuStuff() : MenuElement {
        // obtenemos el elemento menu de menustuff
        let tmpStuffElement = this._menuStuff?.filter(p => p.categoryId == null && p.productId == null)[0];
        let element = Object.assign(new MenuElement(), tmpStuffElement);

        element.text = this._menu?.name ?? '[sin nombre]';
        element.css = 'menu-element-margin';

        return element;
    }

    getCategoriesFromMenuStuff() : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos categorias de menustuff y ordenamos        
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId != null && p.productId == null);
        tmpStuffElements = lodash.sortBy(tmpStuffElements, p => p.position);

        // iteramos
        tmpStuffElements.forEach(p => {
            let category = this._categories?.filter(q => q.id == p.categoryId)[0];

            let element = Object.assign(new MenuElement(), p);
            element.text = category?.name ?? '[sin nombre]';
            element.css = 'category-element-margin';

            elements.push(element);
        });     
            
        return elements;
    }

    getProductsFromMenuStuff(categoryId: number) : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos productos de x categoria de menustuff y ordenamos
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId == categoryId && p.productId != null);
        tmpStuffElements = lodash.sortBy(tmpStuffElements, p => p.position);

        // iteramos
        tmpStuffElements.forEach(p => {
            let product = this._products?.filter(q => q.id == p.productId)[0];

            let element = Object.assign(new MenuElement(), p);
            element.text = product?.name ?? '[sin nombre]';
            element.css = 'product-element-margin';

            elements.push(element);
        });     
            
        return elements;
    }

    onMouseEnter(item: MenuElement) {
        item.isShowingMenu = true;
    }
    
    onMouseLeave(item: MenuElement) {
        item.isShowingMenu = false;
    }

 
    onElementClicked(event: Event, element: MenuElement, action: string) {
        if (action === "add") {
            
            // usuario seleccionó agregar categoria a menú'           
            if (element.categoryId == null && element.productId == null) {
                
                // categorias actuales del menú a una tupla
                let currentCategories = this._data?.filter(p => p.categoryId != null && p.productId == null).map(p => new Tuple2<number, string>(p.categoryId, p.text));
                
                // categorias de base de datos a una tupla
                let availableElements = this._categories?.map(p => new Tuple2<number, string>(p.id, p.name))!;
                
                // obtenemos categorias que no estan en uso
                this.modal_availableElements = availableElements.filter(p => 
                    !currentCategories?.some(q => p.param1 === q.param1 && p.param2 == q.param2)
                );
                this.modal_parentId = element.menuId;
                this.modal_parentText = element.text!;
                
                // TODO: oohg - agregar categorias a menu
                console.log(this.modal_availableElements);
                console.log(this.modal_parentId);
                console.log(this.modal_parentText);

                return;
            }
            
            // agregar seleccionó agregar producto a categoría
            if (element.categoryId != null && element.productId == null) {

                // productos actuales de todo el menú a una tupla
                let currentProducts = this._data?.filter(p => p.categoryId != null && p.productId != null).map(p => new Tuple2<number, string>(p.productId, p.text));
                
                // productos de base de datos a una tupla
                let availableElements = this._products?.map(p => new Tuple2<number, string>(p.id, p.name))!;                
                
                // obtenemos productos que no estan en uso
                this.modal_availableElements = availableElements.filter(p => 
                    !currentProducts?.some(q => p.param1 === q.param1 && p.param2 == q.param2)
                );
                this.modal_parentId = element.categoryId;
                this.modal_parentText = element.text!;

                // TODO: oohg - agregar productos a categoria
                console.log(this.modal_availableElements);
                console.log(this.modal_parentId);
                console.log(this.modal_parentText);

                return;
            }

        }

        throw new Error("Action is not valid");
    }
}


    // menu: add/image/visibility/preview
    // category: add/remove/image/visibility/move-up/move-down
    // product: remove/image/visibility/move-up/move-down   