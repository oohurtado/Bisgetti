import { Component, OnInit } from '@angular/core';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { Utils } from '../../../../../source/utils';
import { ActivatedRoute } from '@angular/router';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { MenuStuffResponse } from '../../../../../source/models/business/responses/menu-stuff-response';
import { CategoryResponse } from '../../../../../source/models/business/responses/category-response';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { MenuBuilder } from '../../../../../source/models/business/menu-buider';
import * as lodash from 'lodash';

@Component({
    selector: 'app-menus-builder',
    templateUrl: './menus-builder.component.html',
    styleUrl: './menus-builder.component.css'
})
export class MenusBuilderComponent implements OnInit {

    _error: string|null = null;
    _isProcessing: boolean = false;

    _menuId!: number|null;
    _menu!: MenuResponse|null;
    _menuStuff!: MenuStuffResponse[]|null;
    _categories!: CategoryResponse[]|null;
    _products!: ProductResponse[]|null;

    _data!: MenuBuilder[]|null;

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
                this.setMenu();
            }, e => {
                this._error = Utils.getErrorsResponse(e);			
            });
        this._isProcessing = false;
    }

    setMenu() {
        console.log("set menu")
        // 1 - buscar menu y sus datos, y agregarlo a la lista
        // 2 - buscar las categorias
        // 2 - order categorias por position

    }

}
