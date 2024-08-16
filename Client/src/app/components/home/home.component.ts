import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuHelper } from '../../source/menu-helper';
import { MenuElement } from '../../source/models/business/menu-element';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuStuffService } from '../../services/business/menu-stuff.service';
import { MenuResponse } from '../../source/models/business/responses/menu-response';
import { CategoryResponse } from '../../source/models/business/responses/category-response';
import { MenuStuffResponse } from '../../source/models/business/responses/menu-stuff-response';
import { ProductResponse } from '../../source/models/business/responses/product-response';
import { Utils } from '../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    _error: string | null = null;
    _isProcessing: boolean = false;

    _menuHelper: MenuHelper | null = null;
    _data: MenuElement[];

    constructor(
        private menuStuffService: MenuStuffService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this._data = [];
        this._menuHelper = new MenuHelper();
    }

    async ngOnInit() {
        alertify.set('notifier','position', 'top-right');
        await this.initAsync();
    }

    async initAsync() {
        let menuId : number | null = 0;

        this._isProcessing = true;
        await this.menuStuffService.getActiveMenuAsync()
            .then(r => {
                menuId = r;
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;
        
        await this.getDataAsync(menuId);  
    }

    async getDataAsync(menuId: number) {
        this._isProcessing = true;
        await Promise.all(
            [
                this.menuStuffService.getMenuAsync(menuId ?? 0), 
                this.menuStuffService.getCategoriesAsync(), 
                this.menuStuffService.getProductsAsync(),
                this.menuStuffService.getMenuStuffAsync(menuId ?? 0)
            ])
            .then(r => {
                let menu = r[0] as MenuResponse;
                let categories = r[1] as CategoryResponse[];
                let products = r[2] as ProductResponse[]; 
                let menuStuff = r[3] as MenuStuffResponse[];

                this._menuHelper?.setData(menuId, menu, categories, products, menuStuff);
                this._data = this._menuHelper?.buildMenu() ?? [];
            }, e => {
                this._error = Utils.getErrorsResponse(e);
                alertify.error(this._error, 1)
                this.router.navigateByUrl('menu-stuff/menus/list');
            });
        this._isProcessing = false;        
    }  

    getMenuElement() : MenuElement | null | undefined {
        let element = this._menuHelper?.getMenuElement();
        if (element?.isVisible) {
            return element;
        } else {
            return null;
        }
    }

    getCategoryElements() : MenuElement[] | null | undefined {
        let elements = this._menuHelper?.getCategoryElements();
        elements = elements?.filter(p => p.isVisible);
        return elements;
    }

    getProductElements(categoryId: number) : MenuElement[] | undefined {
        let elements = this._menuHelper?.getProductElements(categoryId);
        elements = elements?.filter(p => p.isVisible);
        return elements;
    }

    onAddToCartClicked(event: Event) {
        alertify.message('Agregando al carrito...')
    }
}
