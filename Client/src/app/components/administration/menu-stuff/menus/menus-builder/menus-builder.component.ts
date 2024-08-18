import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../../../services/business/business.service';
import { Utils } from '../../../../../source/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuResponse } from '../../../../../source/models/business/responses/menu-response';
import { MenuStuffResponse } from '../../../../../source/models/business/responses/menu-stuff-response';
import { CategoryResponse } from '../../../../../source/models/business/responses/category-response';
import { ProductResponse } from '../../../../../source/models/business/responses/product-response';
import { MenuElement } from '../../../../../source/models/business/menu-element';
import { Tuple2 } from '../../../../../source/models/common/tuple';
import { PositionElementRequest } from '../../../../../source/models/dtos/menus/position-element-request';
import * as lodash from 'lodash';
declare let alertify: any;

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
    
    _elementsAvaialable!: Tuple2<number,string>[]; // id element, text element // para usar en modal, pueden ser categorias o productos que aun no se estan usando, y pueden ser asignados
    _elementClicked!: MenuElement;

    _modal_addElementToElement: boolean = false;
    _modal_removeElementFromElement: boolean = false;
    _modal_updateElementSettings: boolean = false;
    _modal_updateElementImage: boolean = false;

    constructor(
        private businessService: BusinessService,
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
        await Promise.all([this.businessService.getMenuAsync(this._menuId ?? 0), this.businessService.getMenuStuffAsync(this._menuId ?? 0), this.businessService.getCategoriesAsync(), this.businessService.getProductsAsync()])
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
        item.isMouseOverElement = true;
        this._data
            ?.filter(p => p.id != item.id && p.isMouseOverElement)
            .forEach(p => {
                p.isMouseOverElement = false;
        });
    }
    
    onMouseLeave(item: MenuElement) {
        item.isMouseOverElement = false;
    }
    
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

        // TODO: oohg - 4
        // aplica a: menu, categoria, producto
        if (action == "image") {
            this.onImageAction(element);
            return;
        }
        
        // TODO: oohg - 5
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
            let currentCategories = this._data?.filter(p => p.categoryId != null && p.productId == null).map(p => new Tuple2<number, string>(p.categoryId, p.text));
            
            // categorias de base de datos a una tupla
            let elementsAvaialable = this._categories?.map(p => new Tuple2<number, string>(p.id, p.name))!;
            
            // obtenemos categorias que no estan en uso
            this._elementsAvaialable = elementsAvaialable.filter(p => 
                !currentCategories?.some(q => p.param1 === q.param1 && p.param2 == q.param2)
            );                    
            return;
        }

        // agregar seleccionó agregar producto a categoría
        if (element.categoryId != null && element.productId == null) {

            // productos actuales de todo el menú a una tupla
            let currentProducts = this._data?.filter(p => p.categoryId != null && p.productId != null).map(p => new Tuple2<number, string>(p.productId, p.text));
            
            // productos de base de datos a una tupla
            let elementsAvaialable = this._products?.map(p => new Tuple2<number, string>(p.id, p.name))!;                
            
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