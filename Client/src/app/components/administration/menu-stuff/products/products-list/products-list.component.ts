import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../../../../source/models/business/product-response';
import { PageBase } from '../../../../../source/page-base';
import { Router } from '@angular/router';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { LocalStorageService } from '../../../../../services/common/local-storage.service';
import { MenuResponse } from '../../../../../source/models/business/menu-response';
import { Utils } from '../../../../../source/utils';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css'
})
export class ProductsListComponent extends PageBase<ProductResponse> implements OnInit {
    constructor(
        private menuStuffService: MenuStuffService,
        private router: Router,
        localStorageService: LocalStorageService
    ) {
        super('products', localStorageService);
    }

    async ngOnInit() {
        await this.getDataAsync();
    }

    override async getDataAsync() {
        this._error = null;
        this._isProcessing = true;
        await this.menuStuffService
            .getProductsByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
            .then(p => {
                this._pageData = p;
                this.updatePage(p);
            })
            .catch(e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;
    }

    onUpdateClicked(event: Event, product: ProductResponse) {
        this.router.navigateByUrl(`/menu-stuff/products/update/${product.id}`);
    }
}
