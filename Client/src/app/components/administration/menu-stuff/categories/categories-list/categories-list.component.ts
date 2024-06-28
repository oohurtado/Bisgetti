import { Component, OnInit } from '@angular/core';
import { CategoryResponse } from '../../../../../source/models/business/category-response';
import { PageBase } from '../../../../../source/page-base';
import { Router } from '@angular/router';
import { MenuStuffService } from '../../../../../services/business/menu-stuff.service';
import { LocalStorageService } from '../../../../../services/common/local-storage.service';
import { MenuResponse } from '../../../../../source/models/business/menu-response';
import { Utils } from '../../../../../source/utils';
declare let alertify: any;

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent extends PageBase<CategoryResponse> implements OnInit {
    
    constructor(
        private menuStuffService: MenuStuffService,
        private router: Router,
        localStorageService: LocalStorageService
    ) {
        super('categories', localStorageService);
    }

    async ngOnInit() {
        await this.getDataAsync();
    }

    override async getDataAsync() {
        this._error = null;
        this._isProcessing = true;
        await this.menuStuffService
            .getCategoriesByPageAsync(this._pageOrderSelected.data, this._pageOrderSelected.isAscending ? 'asc' : 'desc', this.pageSize, this.pageNumber, '')
            .then(p => {
                this._pageData = p;
                this.updatePage(p);
            })
            .catch(e => {
                this._error = Utils.getErrorsResponse(e);
            });
        this._isProcessing = false;
    }

    onUpdateClicked(event: Event, category: CategoryResponse) {
        this.router.navigateByUrl(`/menu-stuff/categories/update/${category.id}`);
    }

    override onCreateClicked(event: Event): void {
        this.router.navigateByUrl(`/menu-stuff/categories/create`);
    }

    onDeleteClicked(event: Event, category: CategoryResponse) {
		let button = event.target as HTMLButtonElement;
        button.blur();

		let message: string = `
			¿Estás seguro de querer borrar la categoría: <b>${category.name}</b>?
			<br>
			<small><strong>Ten en cuenta lo siguiente:</strong>Los productos agregados a las categorías no serán borrados.</small>
			`;

		let component = this;
		alertify.confirm("Confirmar eliminación", message,
			function () {
				component._isProcessing = true;
				component.menuStuffService.deleteCategory(category.id)
					.subscribe({
						complete: () => {
							component._isProcessing = false;
						},
						error: (e : string) => {
							component._isProcessing = false;
							component._error = Utils.getErrorsResponse(e);					
						},
						next: (val) => {							
							component._pageData.data = component._pageData.data.filter(p => p.id != category.id);
							alertify.message("Categoría borrada", 1)
						}
					});				
			},
			function () {
				// ...
			});		
	}
}
