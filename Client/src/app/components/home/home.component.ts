import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuHelper } from '../../source/helpers/menu-helper';
import { MenuElement } from '../../source/models/business/common/menu-element';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../services/business/business.service';
import { MenuResponse } from '../../source/models/dtos/entities/menu-response';
import { CategoryResponse } from '../../source/models/dtos/entities/category-response';
import { MenuStuffResponse } from '../../source/models/dtos/entities/menu-stuff-response';
import { ProductResponse } from '../../source/models/dtos/entities/product-response';
import { Utils } from '../../source/common/utils';
import { PersonResponse } from '../../source/models/dtos/entities/person-response';
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
    _lastPersonSelected: string = '';

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

        this._lastPersonSelected = this.localStorageService.getUserFirstName();

        this._isInitialLoading = true;
        this._isProcessing = true;        
        
        let menuId : number | null = null;
        await this.businessService.menuStuff_getVisibleMenuAsync()
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
                await this.businessService.cart_getUserPeopleAsync()
                    .then(r => {
                        this._people = r;                
                    }, e => {
                        this._error = Utils.getErrorsResponse(e);
                    });            

                    await this.refreshCartAsync();                       
            }
        }

        this._isProcessing = false;
        this._isInitialLoading = false;
    }

    async refreshCartAsync() {		
		await this.businessService.cart_getNumberOfProductsInCartAsync()
			.then(r => {
				this.sharedService.refreshCart(r.total);             
			}, e => {
				this._error = Utils.getErrorsResponse(e);
			});
	}

    async getAllAsync(menuId: number) {
        this._isProcessing = true;
        await Promise.all(
            [
                this.businessService.menu_getMenuAsync(menuId ?? 0), 
                this.businessService.category_getCategoriesAsync(), 
                this.businessService.product_getProductsAsync(),
                this.businessService.menuStuff_getMenuStuffAsync(menuId ?? 0),
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

        // obtenemos las personas del usuario, ya que pudo haber agregado una nueva persona
        await this.businessService.cart_getUserPeopleAsync()
            .then(r => {
                this._people = r;                
            }, e => {
                this._error = Utils.getErrorsResponse(e);
            });
        
        await this.refreshCartAsync();

        this._lastPersonSelected = personName;        
        this.onAddProductToCartClose();
    }

    onAddProductToCartClose() {        
        this._modal_addProductToCart = false;
    }
}
