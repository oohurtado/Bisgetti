import { Component, OnInit } from '@angular/core';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { MenuStuffResponse } from '../../../../../source/models/business/responses/menu-stuff-response';
import { CategoryResponse } from '../../../../../source/models/business/responses/category-response';
import { MenuElement } from '../../../../../source/models/business/menu-element';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { Tuple2 } from '../../../../../source/models/common/tuple';
import * as lodash from 'lodash';
import { Utils } from '../../../../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-menus-preview',
    templateUrl: './menus-preview.component.html',
    styleUrl: './menus-preview.component.css'
})
export class MenusPreviewComponent implements OnInit {
    _error: string | null = null;
    _isProcessing: boolean = false;

    _menuId!: number | null;
    _menu!: MenuResponse | null;
    _menuStuff!: MenuStuffResponse[] | null;
    _categories!: CategoryResponse[] | null;
    _products!: ProductResponse[] | null;
    _data!: MenuElement[] | null;

    _elementsAvaialable!: Tuple2<number,string>[]; // id element, text element // para usar en modal, pueden ser categorias o productos que aun no se estan usando, y pueden ser asignados
    _elementClicked!: MenuElement;

    _openModal_addElementToElement: boolean = false;
    _openModal_removeElementFromElement: boolean = false;
    _openModal_updateElementSettings: boolean = false;
    _openModal_updateElementImage: boolean = false;
    
    constructor(
        private menuStuffService: MenuStuffService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this._menuId = null;
        this._menu = null;
        this._menuStuff = [];
        this._categories = [];
        this._products = [];
        this._data = [];
    }

    async ngOnInit() {
        alertify.set('notifier','position', 'top-right');
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
                alertify.error(this._error, 1)
                this.router.navigateByUrl('menu-stuff/menus/list');
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
        element.menu = this._menu!;
        return element;
    }

    getCategoriesFromMenuStuff() : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos categorias de menustuff y ordenamos        
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId != null && p.productId == null && p.isVisible);
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

    getProductsFromMenuStuff(categoryId: number) : MenuElement[] {
        let elements: MenuElement[] = [];

        // obtenemos los elementos productos de x categoria de menustuff y ordenamos
        let  tmpStuffElements = this._menuStuff?.filter(p => p.categoryId == categoryId && p.productId != null && p.isVisible);
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

    getMenu() : MenuElement | null {
        let menu = this._data?.at(0); 
        return menu!;
    }

    getCategories() : MenuElement[] | undefined {
        let categories = this._data?.filter(p => p.categoryId != null && p.productId == null); 

        if (categories?.length == 0) {
            return [];
        }
        
        return categories;
    }

    getProducts(categoryId: number) : MenuElement[] | undefined {
        let products = this._data?.filter(p => p.categoryId ==categoryId && p.productId != null); 

        if (products?.length == 0) {
            return [];
        }
        
        return products;
    }

    onElementClicked(event: Event) {
        alertify.message('Agregando al carrito...')
    }
}
