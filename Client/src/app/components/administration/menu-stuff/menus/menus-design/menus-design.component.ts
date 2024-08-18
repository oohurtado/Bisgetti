import { Component, OnInit } from '@angular/core';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { MenuStuffResponse } from '../../../../../source/models/business/responses/menu-stuff-response';
import { CategoryResponse } from '../../../../../source/models/business/responses/category-response';
import { MenuElement } from '../../../../../source/models/business/common/menu-element';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../../../../services/business/business.service';
import { Tuple2 } from '../../../../../source/models/common/tuple';
import * as lodash from 'lodash';
import { Utils } from '../../../../../source/utils';
import { MenuHelper } from '../../../../../source/menu-helper';
import { PositionElementRequest } from '../../../../../source/models/dtos/menus/position-element-request';
declare let alertify: any;

@Component({
    selector: 'app-menus-design',
    templateUrl: './menus-design.component.html',
    styleUrl: './menus-design.component.css'
})
export class MenusDesignComponent implements OnInit {
    _error: string | null = null;
    _isProcessing: boolean = false;

    _menuHelper: MenuHelper | null = null;
    _designMode: boolean = false;
    _menuId!: number | null;
    _data: MenuElement[];

    _modal_addElementToElement: boolean = false;
    _modal_removeElementFromElement: boolean = false;
    _modal_updateElementSettings: boolean = false;
    _modal_updateElementImage: boolean = false;

    _elementsAvaialable!: Tuple2<number,string>[];
    _elementClicked!: MenuElement;

    constructor(
        private businessService: BusinessService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this._menuId = null;
        this._data = [];
        this._menuHelper = new MenuHelper();
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
        await Promise.all(
            [
                this.businessService.getMenuAsync(this._menuId ?? 0), 
                this.businessService.getCategoriesAsync(), 
                this.businessService.getProductsAsync(),
                this.businessService.getMenuStuffAsync(this._menuId ?? 0)
            ])
            .then(r => {
                let menu = r[0] as MenuResponse;
                let categories = r[1] as CategoryResponse[];
                let products = r[2] as ProductResponse[]; 
                let menuStuff = r[3] as MenuStuffResponse[];

                this._menuHelper?.setData(this._menuId, menu, categories, products, menuStuff);
                this._data = this._menuHelper?.buildMenu() ?? [];
            }, e => {
                this._error = Utils.getErrorsResponse(e);
                alertify.error(this._error, 1)
                this.router.navigateByUrl('menu-stuff/menus/list');
            });
        this._isProcessing = false;        
    }  

    getMenuElement() : MenuElement | null | undefined {
        return this._menuHelper?.getMenuElement();
    }

    getCategoryElements() : MenuElement[] | null | undefined {
        return this._menuHelper?.getCategoryElements();
    }

    getProductElements(categoryId: number) : MenuElement[] | undefined {
        return this._menuHelper?.getProductElements(categoryId);
    }

    onAddToCartClicked(event: Event) {
        alertify.message('Agregando al carrito...')
    }

    onDesignClicked(event: Event) {
        this._designMode = !this._designMode;
    }

    /* modals */

    onElementClicked(event: Event, element: MenuElement, action: string) {
        this._elementClicked = element;    

        // aplica a: menu / category
        if (action === "add") {
            this.onAddAction(element);            
            return;
        }

        // aplica a: categoria, producto
        if (action === "remove") {
            this.onRemoveAction(element);
            return;
        }
        
        // aplica a: menu, categoria, producto
        if (action == "settings") {
            this.onSettingsAction(element);
            return;
        }

        // aplica a: menu, categoria, producto
        if (action == "image") {
            this.onImageAction(element);
            return;
        }
        
        // aplica a: menu
        if (action == "design") {
            this.onPreviewAction(element);
            return;
        }

        // aplica a: categoria, producto
        if (action == "move-up" || action == "move-down") {
            this.onMoveUpOrMoveDown(element, action);
            return;
        }      

        throw new Error("Action is not valid");
    }

    onAddAction(element: MenuElement) {
        this._modal_addElementToElement = true;

        // usuario seleccionó agregar categoria a menú'           
        if (element.categoryId == null && element.productId == null) {
                        
            // categorias actuales del menú a una tupla
            let currentCategories = this._data?.filter(p => p.categoryId != null && p.productId == null).map(p => new Tuple2<number, string>(p.categoryId, p.category.name));

            // categorias de base de datos a una tupla
            let elementsAvaialable = this._menuHelper?.getCategories()?.map(p => new Tuple2<number, string>(p.id, p.name))!;
            
            // obtenemos categorias que no estan en uso
            this._elementsAvaialable = elementsAvaialable.filter(p => 
                !currentCategories?.some(q => p.param1 === q.param1 && p.param2 == q.param2)
            );                    
            return;
        }

        // agregar seleccionó agregar producto a categoría
        if (element.categoryId != null && element.productId == null) {

            // productos actuales del menú a una tupla
            let currentProducts = this._data?.filter(p => p.categoryId != null && p.productId != null).map(p => new Tuple2<number, string>(p.productId, p.product.name));
            
            // productos de base de datos a una tupla
            let elementsAvaialable = this._menuHelper?.getProducts()?.map(p => new Tuple2<number, string>(p.id, p.name))!;                
            
            // obtenemos productos que no estan en uso
            this._elementsAvaialable = elementsAvaialable.filter(p => 
                !currentProducts?.some(q => p.param1 === q.param1 && p.param2 == q.param2)
            );
            return;
        }
    }

    onRemoveAction(element: MenuElement) {
        this._modal_removeElementFromElement = true;        
    }

    onSettingsAction(element: MenuElement) {
        this._modal_updateElementSettings = true;
    }    

    onImageAction(element: MenuElement) {
        this._modal_updateElementImage = true;
    }
    
    onMoveUpOrMoveDown(element: MenuElement, action: string) {
        let model = new PositionElementRequest(element.menuId, element.categoryId, element.productId, action);
        this.businessService.updateElementPosition(model)
            .subscribe({
                complete: () => {
                    this._isProcessing = false;
                },
                error: (e : string) => {
                    this._isProcessing = false;
                    this._error = Utils.getErrorsResponse(e);
                    alertify.error(this._error, 3);
                },
                next: (val) => {                
                    alertify.message("Posición actualizada", 1)
                    this.getDataAsync();
                }
            });                  
    }

    onPreviewAction(element: MenuElement) {
        this.router.navigateByUrl(`/menu-stuff/menus/design/${element.menuId}`);        
    }

    onModalClosedClicked() {  
        this._modal_addElementToElement = false;      
        this._modal_removeElementFromElement = false;
        this._modal_updateElementSettings = false;
        this._modal_updateElementImage = false;
    }

    async onModalOkClicked() {
        this.onModalClosedClicked();
        await this.getDataAsync();
    }
}
