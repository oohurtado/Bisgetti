import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuHelper } from '../../source/menu-helper';
import { MenuElement } from '../../source/models/business/menu-element';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business/business.service';
import { MenuResponse } from '../../source/models/business/responses/menu-response';
import { CategoryResponse } from '../../source/models/business/responses/category-response';
import { MenuStuffResponse } from '../../source/models/business/responses/menu-stuff-response';
import { ProductResponse } from '../../source/models/business/responses/product-response';
import { Utils } from '../../source/utils';
import { PersonResponse } from '../../source/models/business/responses/person-response';
import { LocalStorageService } from '../../services/common/local-storage.service';
import { SharedService } from '../../services/common/shared.service';
declare let alertify: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    _error: string | null = null;
    _isProcessing: boolean = false;
    
    _isInitialLoading = false;
    _weHaveAMenu = false;

    _menuHelper: MenuHelper | null = new MenuHelper();
    _data: MenuElement[] = [];
    _people: PersonResponse[] = [];

    _modal_addProductToCart: boolean = false;
    _productElement!: MenuElement;
    _lastPersonSelected: string = 'Yo';

    constructor(
        private businessService: BusinessService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private localStorageService: LocalStorageService,
        private sharedService: SharedService
    ) {
    }

    async ngOnInit() {
        alertify.set('notifier','position', 'top-right');

        this._isInitialLoading = true;
        this._isProcessing = true;        
        
        let menuId : number | null = null;
        await this.businessService.getVisibleMenuAsync()
            .then(r => {
                menuId = r;
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });

        if (menuId == null) {
            this._weHaveAMenu = false;
        } else {
            this._weHaveAMenu = true;
            await this.getAllAsync(menuId);

            if (this.localStorageService.isUserAuthenticated()) {
                await this.businessService.getUserPeopleAsync()
                    .then(r => {
                        this._people = r;                
                    }, e => {
                        this._error = Utils.getErrorsResponse(e);
                    });            

                // TODO: obtener numero de productos en el carrito
                this.sharedService.onProductAddedToCart(5);
            }
        }

        this._isProcessing = false;
        this._isInitialLoading = false;
    }

    async getAllAsync(menuId: number) {
        this._isProcessing = true;
        await Promise.all(
            [
                this.businessService.getMenuAsync(menuId ?? 0), 
                this.businessService.getCategoriesAsync(), 
                this.businessService.getProductsAsync(),
                this.businessService.getMenuStuffAsync(menuId ?? 0),
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
            });
        this._isProcessing = false;        
    }

    getMenuElement() : MenuElement | null | undefined {
        return this._menuHelper?.getMenuElement();
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

    onAddToCartClicked(event: Event, element: MenuElement) {
        if (this.localStorageService.isUserAdmin()) {
            alertify.message('admin')
        } else if (this.localStorageService.isUserBoss()) {
            alertify.message('boss')
        } else if (this.localStorageService.isUserCustomer()) {
            this._productElement = element;
            this._modal_addProductToCart = true;
        } else {
            this.router.navigateByUrl('/access/login');
        }
    }

    async onAddProductToCartOk(personName: string) {
        await this.businessService.getUserPeopleAsync()
        .then(r => {
            this._people = r;                
        }, e => {
            this._error = Utils.getErrorsResponse(e);
        });

        // TODO: obtener numero de productos en el carrito
        this.sharedService.onProductAddedToCart(10);

        this._lastPersonSelected = personName;        
        this.onAddProductToCartClose();
    }

    onAddProductToCartClose() {        
        this._modal_addProductToCart = false;
    }
}
