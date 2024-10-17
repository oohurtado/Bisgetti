import { Injectable } from '@angular/core';
import { RequestService } from '../common/request.service';
import { MenuResponse } from '../../source/models/dtos/entities/menu-response';
import { PageData } from '../../source/models/common/page-data';
import { CreateOrUpdateMenuRequest } from '../../source/models/dtos/menus/create-or-update-menu-request';
import { CategoryResponse } from '../../source/models/dtos/entities/category-response';
import { CreateOrUpdateCategoryRequest } from '../../source/models/dtos/menus/create-or-update-category-request';
import { ProductResponse } from '../../source/models/dtos/entities/product-response';
import { CreateOrUpdateProductRequest } from '../../source/models/dtos/menus/create-or-update-product-request';
import { MenuStuffResponse } from '../../source/models/dtos/entities/menu-stuff-response';
import { AddOrRemoveElementRequest } from '../../source/models/dtos/menus/add-or-remove-element-request';
import { PositionElementRequest } from '../../source/models/dtos/menus/position-element-request';
import { SettingsElementRequest } from '../../source/models/dtos/menus/settings-element-request';
import { ImageElementRequest } from '../../source/models/dtos/menus/image-element-request';
import { ImageElementResponse } from '../../source/models/dtos/menus/image-element-response';
import { PersonResponse } from '../../source/models/dtos/entities/person-response';
import { AddProductToCartRequest } from '../../source/models/dtos/business/add-product-to-cart-request';
import { CartElementResponse } from '../../source/models/dtos/entities/cart-element-response';
import { NumberOfProductsInCartResponse } from '../../source/models/dtos/business/number-of-products-in-cart-response';
import { AddressResponse } from '../../source/models/dtos/entities/address-response';
import { UpdateProductFromCartRequest } from '../../source/models/dtos/business/update-product-from-cart-request';
import { TotalOfProductsInCartResponse } from '../../source/models/dtos/business/total-of-products-in-cart-response';
import { ShippingCostResponse } from '../../source/models/dtos/business/shipping-cost-response';
import { CreateOrderForCustomerRequest } from '../../source/models/dtos/business/cart-order-for-customer-request';
import { OrderResponse } from '../../source/models/dtos/entities/order-response';
import { OrderChangeStatusRequest } from '../../source/models/dtos/business/order-change-status-request';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BusinessService {

    constructor(private requestService: RequestService) { }

	///////////
	// menus //
	///////////

	menu_getMenu(id: number) {
		return this.requestService.get<MenuResponse>(`/business/menus/${id}`);
	}

    menu_getMenuAsync(id: number) : Promise<MenuResponse> {
		return new Promise((resolve, reject) => {
			this.menu_getMenu(id)
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

    menu_getMenusByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<MenuResponse>>(`/business/menus/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	menu_getMenusByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<MenuResponse>> {
		return new Promise((resolve, reject) => {
			this.menu_getMenusByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
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

	menu_createMenu(model: CreateOrUpdateMenuRequest) {
		return this.requestService.post(`/business/menus`, model);
	}

	menu_updateMenu(id: number, model: CreateOrUpdateMenuRequest) {
		return this.requestService.put(`/business/menus/${id}`, model);
	}

	menu_deleteMenu(id: number) {
		return this.requestService.delete(`/business/menus/${id}`);
	}

	////////////////
	// categorias //
	////////////////

	category_getCategory(id: number) {
		return this.requestService.get<CategoryResponse>(`/business/categories/${id}`);
	}

    category_getCategoryAsync(id: number) : Promise<CategoryResponse> {
		return new Promise((resolve, reject) => {
			this.category_getCategory(id)
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

    category_getCategoriesByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<CategoryResponse>>(`/business/categories/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	category_getCategoriesByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<CategoryResponse>> {
		return new Promise((resolve, reject) => {
			this.category_getCategoriesByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
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

	category_getCategories() {	
		return this.requestService.get<CategoryResponse[]>(`/business/categories`);
	}

	category_getCategoriesAsync() : Promise<CategoryResponse[]> {
		return new Promise((resolve, reject) => {
			this.category_getCategories()
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

	category_createCategory(model: CreateOrUpdateCategoryRequest) {
		return this.requestService.post(`/business/categories`, model);
	}

	category_updateCategory(id: number, model: CreateOrUpdateCategoryRequest) {
		return this.requestService.put(`/business/categories/${id}`, model);
	}

	category_deleteCategory(id: number) {
		return this.requestService.delete(`/business/categories/${id}`);
	}
	///////////////
	// productos //
	///////////////

	product_getProduct(id: number) {
		return this.requestService.get<ProductResponse>(`/business/products/${id}`);
	}

    product_getProductAsync(id: number) : Promise<ProductResponse> {
		return new Promise((resolve, reject) => {
			this.product_getProduct(id)
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

    product_getProductsByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) {	
		return this.requestService.get<PageData<ProductResponse>>(`/business/products/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}?term=${term}`);
	}

	product_getProductsByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, term: string) : Promise<PageData<ProductResponse>> {
		return new Promise((resolve, reject) => {
			this.product_getProductsByPage(sortColumn, sortOrder, pageSize, pageNumber, term)
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

	product_getProducts() {	
		return this.requestService.get<ProductResponse[]>(`/business/products`);
	}

	product_getProductsAsync() : Promise<ProductResponse[]> {
		return new Promise((resolve, reject) => {
			this.product_getProducts()
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

	product_createProduct(model: CreateOrUpdateProductRequest) {
		return this.requestService.post(`/business/products`, model);
	}

	product_updateProduct(id: number, model: CreateOrUpdateProductRequest) {
		return this.requestService.put(`/business/products/${id}`, model);
	}

	product_deleteProduct(id: number) {
		return this.requestService.delete(`/business/products/${id}`);
	}

	////////////////
	// menu-stuff //
	////////////////

	menuStuff_getVisibleMenu() {
		return this.requestService.get<number | null>(`/business/menu-stuff/visible`);
	}

	menuStuff_getVisibleMenuAsync() : Promise<number | null> {
		return new Promise((resolve, reject) => {
			this.menuStuff_getVisibleMenu()
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

	menuStuff_getMenuStuff(menuId: number) {	
		return this.requestService.get<MenuStuffResponse[]>(`/business/menu-stuff/${menuId}`);
	}

	menuStuff_getMenuStuffAsync(menuId: number) : Promise<MenuStuffResponse[]> {
		return new Promise((resolve, reject) => {
			this.menuStuff_getMenuStuff(menuId)
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

	menuStuff_addOrRemoveElement(model: AddOrRemoveElementRequest) {
		return this.requestService.put(`/business/menu-stuff/element`, model);
	}

	menuStuff_addOrRemoveElementAsync(model: AddOrRemoveElementRequest) {
		return new Promise((resolve, reject) => {
			this.menuStuff_addOrRemoveElement(model)
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

	menuStuff_updateElementPosition(model: PositionElementRequest) {
		return this.requestService.put(`/business/menu-stuff/element/position`, model);
	}	

	menuStuff_updateElementSettings(model: SettingsElementRequest) {
		return this.requestService.put(`/business/menu-stuff/element/settings`, model);
	}

	menuStuff_updateElementSettingsAsync(model: SettingsElementRequest) {
		return new Promise((resolve, reject) => {
			this.menuStuff_updateElementSettings(model)
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

	menuStuff_getElementImage(menuId: number, categoryId: number, productId: number) {
		if (menuId == null) {
			menuId = 0;
		}
		if (categoryId == null) {
			categoryId = 0;
		}
		if (productId == null) {
			productId = 0;
		}
		return this.requestService.get<ImageElementResponse>(`/business/menu-stuff/element/image/${menuId}/${categoryId}/${productId}`);
	}

	menuStuff_updateElementImage(model: FormData, menuId: number, categoryId: number, productId: number) {
		if (menuId == null) {
			menuId = 0;
		}
		if (categoryId == null) {
			categoryId = 0;
		}
		if (productId == null) {
			productId = 0;
		}
		return this.requestService.put(`/business/menu-stuff/element/image/${menuId}/${categoryId}/${productId}`, model);
	}

	menuStuff_updateElementImageAsync(model: FormData, menuId: number, categoryId: number, productId: number) {
		return new Promise((resolve, reject) => {
			this.menuStuff_updateElementImage(model, menuId, categoryId, productId)
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

	menuStuff_deleteElementImage(model: ImageElementRequest) {
		if (model.menuId == null) {
			model.menuId = 0;
		}
		if (model.categoryId == null) {
			model.categoryId = 0;
		}
		if (model.productId == null) {
			model.productId = 0;
		}
		return this.requestService.delete(`/business/menu-stuff/element/image/${model.menuId}/${model.categoryId}/${model.productId}`);
	}

	menuStuff_deleteElementImageAsync(model: ImageElementRequest) {
		return new Promise((resolve, reject) => {
			this.menuStuff_deleteElementImage(model)
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

	//////////////////////////
	// cart - user - people //
	//////////////////////////

	cart_getUserPeople() {
		return this.requestService.get<PersonResponse[]>(`/business/cart/user/people`);
	}

    cart_getUserPeopleAsync() : Promise<PersonResponse[]> {
		return new Promise((resolve, reject) => {
			this.cart_getUserPeople()
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

	cart_getTips() {
		return this.requestService.get<number[]>(`/business/cart/tips`);
	}

    cart_getTipsAsync() : Promise<number[]> {
		return new Promise((resolve, reject) => {
			this.cart_getTips()
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

	cart_getShippingCost() {
		return this.requestService.get<ShippingCostResponse>(`/business/cart/shipping-cost`);
	}

	cart_getShippingCostAsync() : Promise<ShippingCostResponse> {
		return new Promise((resolve, reject) => {
			this.cart_getShippingCost()
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

	cart_getUserAddresses() {
		return this.requestService.get<AddressResponse[]>(`/business/cart/user/addresses`);
	}

    cart_getUserAddressesAsync() : Promise<AddressResponse[]> {
		return new Promise((resolve, reject) => {
			this.cart_getUserAddresses()
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

	cart_getUserAddress(addressId: number|null) {
		return this.requestService.get<AddressResponse>(`/business/cart/user/addresses/${addressId}`);
	}

	cart_getUserAddressAsync(addressId: number|null) : Promise<AddressResponse> {
		return new Promise((resolve, reject) => {
			this.cart_getUserAddress(addressId)
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

	cart_addProductToCart(model: AddProductToCartRequest) {
		return this.requestService.post(`/business/cart/product`, model);
	}

	cart_addProductToCartAsync(model: AddProductToCartRequest) {
		return new Promise((resolve, reject) => {
			this.cart_addProductToCart(model)
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

	cart_updateProductFromCart(model: UpdateProductFromCartRequest) {
		return this.requestService.put(`/business/cart/product`, model);
	}

	cart_updateProductFromCartAsync(model: UpdateProductFromCartRequest) {
		return new Promise((resolve, reject) => {
			this.cart_updateProductFromCart(model)
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

	cart_getProductsFromCart() {
		return this.requestService.get<CartElementResponse[]>(`/business/cart/product`);
	}

	cart_getProductsFromCartAsync() : Promise<CartElementResponse[]> {
		return new Promise((resolve, reject) => {
			this.cart_getProductsFromCart()
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

	cart_deleteProductFromCart(id: number) {
		return this.requestService.delete(`/business/cart/product/${id}`);
	}

	cart_getNumberOfProductsInCart() {
		return this.requestService.get<NumberOfProductsInCartResponse>(`/business/cart/product/number-of-products-in-cart`);
	}

    cart_getNumberOfProductsInCartAsync() : Promise<NumberOfProductsInCartResponse> {
		return new Promise((resolve, reject) => {
			this.cart_getNumberOfProductsInCart()
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

	cart_getTotalOfProductsInCart() {
		return this.requestService.get<TotalOfProductsInCartResponse>(`/business/cart/product/total-of-products-in-cart`);
	}

	cart_getTotalOfProductsInCartAsync() : Promise<TotalOfProductsInCartResponse> {
		return new Promise((resolve, reject) => {
			this.cart_getTotalOfProductsInCart()
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

	cart_createOrderForCustomer(model: CreateOrderForCustomerRequest) {
		return this.requestService.post(`/business/cart/customer/order`, model);
	}

	///////////
	// order //
	///////////

	order_getOrdersByPage(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, filter: string) {	
		return this.requestService.get<PageData<OrderResponse>>(`/business/orders/${sortColumn}/${sortOrder}/${pageSize}/${pageNumber}/${filter}`);
	}

	order_getOrdersByPageAsync(sortColumn: string, sortOrder: string, pageSize: number, pageNumber: number, filter: string) : Promise<PageData<OrderResponse>> {
		return new Promise((resolve, reject) => {
			this.order_getOrdersByPage(sortColumn, sortOrder, pageSize, pageNumber, filter)
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

	order_getOrder(orderId: number) {	
		return this.requestService.get<OrderResponse>(`/business/orders/${orderId}`);
	}

	order_getOrderAsync(orderId: number) : Promise<OrderResponse> {
		return new Promise((resolve, reject) => {
			this.order_getOrder(orderId)
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

	order_nextStep(orderId: number, model: OrderChangeStatusRequest) {
		return this.requestService.put(`/business/orders/${orderId}/next-step`, model);
	}

	order_nextStepAsync(orderId: number, model: OrderChangeStatusRequest) {
		return new Promise((resolve, reject) => {
			this.order_nextStep(orderId, model)
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

	order_canceled(orderId: number, model: OrderChangeStatusRequest) {
		return this.requestService.put(`/business/orders/${orderId}/canceled`, model);
	}

	order_canceledAsync(orderId: number, model: OrderChangeStatusRequest) {
		return new Promise((resolve, reject) => {
			this.order_canceled(orderId, model)
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

	order_declined(orderId: number, model: OrderChangeStatusRequest) {
		return this.requestService.put(`/business/orders/${orderId}/declined`, model);
	}

	order_declinedAsync(orderId: number, model: OrderChangeStatusRequest) {
		return new Promise((resolve, reject) => {
			this.order_declined(orderId, model)
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
}
