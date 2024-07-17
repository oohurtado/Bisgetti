import { Injectable } from '@angular/core';
import { RequestService } from '../common/request.service';
import { MenuResponse } from '../../source/models/business/menu-response';
import { PageData } from '../../source/models/common/page-data';
import { CreateOrUpdateMenuRequest } from '../../source/models/dtos/menus/create-or-update-menu-request';
import { CategoryResponse } from '../../source/models/business/category-response';
import { CreateOrUpdateCategoryRequest } from '../../source/models/dtos/menus/create-or-update-category-request';
import { ProductResponse } from '../../source/models/business/product-response';
import { CreateOrUpdateProductRequest } from '../../source/models/dtos/menus/create-or-update-product-request';
import { MenuStuffResponse } from '../../source/models/business/menu-stuff-response';
import { AddOrRemoveElementRequest } from '../../source/models/dtos/menus/add-or-remove-element-request';
import { MoveElementRequest } from '../../source/models/dtos/menus/move-element-request';

@Injectable({
    providedIn: 'root'
})
export class MenuStuffService {

    constructor(private requestService: RequestService) { }

	///////////
	// menus //
	///////////

	getMenu(id: number) {
		return this.requestService.get<MenuResponse>(`/business/menus/${id}`);
	}

    getMenuAsync(id: number) : Promise<MenuResponse> {
		return new Promise((resolve, reject) => {
			this.getMenu(id)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

    getMenusByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<MenuResponse>>(`/business/menus/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	getMenusByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<MenuResponse>> {
		return new Promise((resolve, reject) => {
			this.getMenusByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	createMenu(model: CreateOrUpdateMenuRequest) {
		return this.requestService.post(`/business/menus`, model);
	}

	updateMenu(id: number, model: CreateOrUpdateMenuRequest) {
		return this.requestService.put(`/business/menus/${id}`, model);
	}

	deleteMenu(id: number) {
		return this.requestService.delete(`/business/menus/${id}`);
	}

	////////////////
	// categorias //
	////////////////

	getCategory(id: number) {
		return this.requestService.get<CategoryResponse>(`/business/categories/${id}`);
	}

    getCategoryAsync(id: number) : Promise<CategoryResponse> {
		return new Promise((resolve, reject) => {
			this.getCategory(id)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

    getCategoriesByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<CategoryResponse>>(`/business/categories/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	getCategoriesByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<CategoryResponse>> {
		return new Promise((resolve, reject) => {
			this.getCategoriesByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	getCategories() {	
		return this.requestService.get<CategoryResponse[]>(`/business/categories`);
	}

	getCategoriesAsync() : Promise<CategoryResponse[]> {
		return new Promise((resolve, reject) => {
			this.getCategories()
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	createCategory(model: CreateOrUpdateCategoryRequest) {
		return this.requestService.post(`/business/categories`, model);
	}

	updateCategory(id: number, model: CreateOrUpdateCategoryRequest) {
		return this.requestService.put(`/business/categories/${id}`, model);
	}

	deleteCategory(id: number) {
		return this.requestService.delete(`/business/categories/${id}`);
	}
	///////////////
	// productos //
	///////////////

	getProduct(id: number) {
		return this.requestService.get<ProductResponse>(`/business/products/${id}`);
	}

    getProductAsync(id: number) : Promise<ProductResponse> {
		return new Promise((resolve, reject) => {
			this.getProduct(id)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

    getProductsByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<ProductResponse>>(`/business/products/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	getProductsByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<ProductResponse>> {
		return new Promise((resolve, reject) => {
			this.getProductsByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	getProducts() {	
		return this.requestService.get<ProductResponse[]>(`/business/products`);
	}

	getProductsAsync() : Promise<ProductResponse[]> {
		return new Promise((resolve, reject) => {
			this.getProducts()
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	createProduct(model: CreateOrUpdateProductRequest) {
		return this.requestService.post(`/business/products`, model);
	}

	updateProduct(id: number, model: CreateOrUpdateProductRequest) {
		return this.requestService.put(`/business/products/${id}`, model);
	}

	deleteProduct(id: number) {
		return this.requestService.delete(`/business/products/${id}`);
	}

	////////////////
	// menu-stuff //
	////////////////

	getMenuStuff(menuId: number) {	
		return this.requestService.get<MenuStuffResponse[]>(`/business/menu-stuff/${menuId}`);
	}

	getMenuStuffAsync(menuId: number) : Promise<MenuStuffResponse[]> {
		return new Promise((resolve, reject) => {
			this.getMenuStuff(menuId)
			.subscribe({
				next: (value) => {
					resolve(value);
				},
				error: (response) => {
					reject(response);
				}
			});
		});
	}

	addOrRemoveElement(model: AddOrRemoveElementRequest) {
		return this.requestService.put(`/business/menu-stuff/element`, model);
	}

	moveElement(model: MoveElementRequest) {
		return this.requestService.put(`/business/menu-stuff/element/move`, model);
	}	
}
