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

        // menu
        menu = this.getMenu();        
        this._data?.push(menu);

        // categorias
        categories = this.getCategories();
        this._data = this._data?.concat(categories);

        // productos
        categories.forEach(p => {            
            products = this.getProduct(p.categoryId);
            let index = this._data?.findIndex(q => q.categoryId == p.categoryId) ?? 0;
            this._data?.splice(index + 1, 0, ...products)
        });
    }

    getMenu() : MenuElement {
        // obtenemos el elemento menu de menustuff
        let tmpStuffElement = this._menuStuff?.filter(p => p.categoryId == null && p.productId == null)[0];
        let element = Object.assign(new MenuElement(), tmpStuffElement);

        element.text = this._menu?.name ?? '[sin nombre]';
        element.css = 'menu-element-margin';

        return element;
    }

    getCategories() : MenuElement[] {
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

    getProduct(categoryId: number) : MenuElement[] {
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
}
