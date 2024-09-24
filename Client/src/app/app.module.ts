import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import locale_es_mx from '@angular/common/locales/es-MX';
registerLocaleData(locale_es_mx, 'es-MX');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/access/login/login.component';
import { SignupComponent } from './components/access/signup/signup.component';
import { ForbiddenComponent } from './components/access/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { AppRouting } from './routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { NavbarAdminComponent } from './components/_shared/navbar/navbar-admin/navbar-admin.component';
import { NavbarComponent } from './components/_shared/navbar/navbar/navbar.component';
import { NavbarCustomerComponent } from './components/_shared/navbar/navbar-client/navbar-customer.component';
import { NavbarBossComponent } from './components/_shared/navbar/navbar-boss/navbar-boss.component';
import { NavbarAnonComponent } from './components/_shared/navbar/navbar-anon/navbar-anon.component';
import { PageOrderComponent } from './components/_shared/page/page-order/page-order.component';
import { PagePaginationComponent } from './components/_shared/page/page-pagination/page-pagination.component';
import { PageSearchComponent } from './components/_shared/page/page-search/page-search.component';
import { PageSyncComponent } from './components/_shared/page/page-sync/page-sync.component';
import { ProcessingComponent } from './components/_shared/processing/processing.component';
import { AuthInterceptorService } from './services/common/auth-interceptor.service';
import { UsersChangeRoleComponent } from './components/administration/users/users-change-role/users-change-role.component';
import { UsersListComponent } from './components/administration/users/users-list/users-list.component';
import { UsersComponent } from './components/administration/users/users.component';
import { RoleStrPipe } from './pipes/role-str.pipe';
import { UpdatePersonalDataComponent } from './components/my-account/update-personal-data/update-personal-data.component';
import { ChangePasswordComponent } from './components/my-account/change-password/change-password.component';
import { AddressesListComponent } from './components/my-account/addresses/addresses-list/addresses-list.component';
import { AddressesCreateOrUpdateComponent } from './components/my-account/addresses/addresses-create-or-update/addresses-create-or-update.component';
import { PasswordRecoveryComponent } from './components/access/password-recovery/password-recovery.component';
import { PasswordSetComponent } from './components/access/password-set/password-set.component';
import { MyAccountListComponent } from './components/my-account/my-account-list/my-account-list.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CategoriesCreateOrUpdateComponent } from './components/administration/menu-stuff/categories/categories-create-or-update/categories-create-or-update.component';
import { CategoriesListComponent } from './components/administration/menu-stuff/categories/categories-list/categories-list.component';
import { CategoriesComponent } from './components/administration/menu-stuff/categories/categories.component';
import { MenuStuffComponent } from './components/administration/menu-stuff/menu-stuff.component';
import { MenusCreateOrUpdateComponent } from './components/administration/menu-stuff/menus/menus-create-or-update/menus-create-or-update.component';
import { MenusListComponent } from './components/administration/menu-stuff/menus/menus-list/menus-list.component';
import { MenusComponent } from './components/administration/menu-stuff/menus/menus.component';
import { ProductsCreateOrUpdateComponent } from './components/administration/menu-stuff/products/products-create-or-update/products-create-or-update.component';
import { ProductsListComponent } from './components/administration/menu-stuff/products/products-list/products-list.component';
import { ProductsComponent } from './components/administration/menu-stuff/products/products.component';
import { AddressesComponent } from './components/my-account/addresses/addresses.component';
import { PageCreateComponent } from './components/_shared/page/page-create/page-create.component';
import { NavbarUserNameComponent } from './components/_shared/navbar/navbar-user-name/navbar-user-name.component';
import { AddElementToElementComponent } from './components/_shared/modals/business/menu-stuff/add-element-to-element/add-element-to-element.component';
import { UpdateElementImageComponent } from './components/_shared/modals/business/menu-stuff/update-element-image/update-element-image.component';
import { UpdateElementSettingsComponent } from './components/_shared/modals/business/menu-stuff/update-element-settings/update-element-settings.component';
import { RemoveElementFromElementComponent } from './components/_shared/modals/business/menu-stuff/remove-element-from-element/remove-element-from-element.component';
import { MenusDesignComponent } from './components/administration/menu-stuff/menus/menus-design/menus-design.component';
import { AddToCartComponent } from './components/_shared/modals/business/cart/add-to-cart/add-to-cart.component';
import { MenuStuffListComponent } from './components/administration/menu-stuff/menu-stuff-list/menu-stuff-list.component';
import { CartComponent } from './components/cart/cart.component';
import { CartTabProductsComponent } from './components/cart/cart-tab-products/cart-tab-products.component';
import { CartTabDetailsComponent } from './components/cart/cart-tab-details/cart-tab-details.component';
import { CartTabConfirmationDeliveryComponent } from './components/cart/cart-tab-confirmation-delivery/cart-tab-confirmation-delivery.component';
import { DeliveryMethodPipe } from './pipes/delivery-method.pipe';
import { OrdersComponent } from './components/orders/orders.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { OrdersListCustomerComponent } from './components/orders/orders-list-customer/orders-list-customer.component';
import { OrderStatusCustomerForDeliveryPipe } from './pipes/order-status-customer-for-delivery.pipe';
import { OrderStatusCustomerTakeAwayPipe } from './pipes/order-status-customer-take-away.pipe';
import { OrdersListBossComponent } from './components/orders/orders-list-boss/orders-list-boss.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		SignupComponent,
		ForbiddenComponent,
		HomeComponent,
		NavbarComponent,
		NavbarAdminComponent,
		NavbarCustomerComponent,
		NavbarBossComponent,
		NavbarAnonComponent,
		UsersComponent,
		UsersListComponent,
		UsersChangeRoleComponent,
		PageOrderComponent,
		PagePaginationComponent,
		PageSearchComponent,
		PageSyncComponent,
		ProcessingComponent,
		RoleStrPipe,
		UpdatePersonalDataComponent,
		MyAccountListComponent,
		ChangePasswordComponent,
		AddressesListComponent,
		AddressesCreateOrUpdateComponent,
		PasswordRecoveryComponent,
		PasswordSetComponent,
		MyAccountComponent,
		MenuStuffComponent,
		MenuStuffListComponent,
		MenusComponent,
		CategoriesComponent,
		ProductsComponent,
		MenusListComponent,
		MenusCreateOrUpdateComponent,
		CategoriesListComponent,
		CategoriesCreateOrUpdateComponent,
		ProductsListComponent,
		ProductsCreateOrUpdateComponent,
		AddressesComponent,
		PageCreateComponent,
		NavbarUserNameComponent,
		AddElementToElementComponent,
		UpdateElementImageComponent,
		UpdateElementSettingsComponent,
		RemoveElementFromElementComponent,
  		MenusDesignComponent,  		
  		AddToCartComponent, 
		CartComponent, 
		CartTabProductsComponent, 
		CartTabDetailsComponent, 
		CartTabConfirmationDeliveryComponent, 
		DeliveryMethodPipe, 
		OrdersComponent, 
		OrdersListComponent, 
		OrdersListCustomerComponent, 
		OrderStatusCustomerForDeliveryPipe, 
		OrderStatusCustomerTakeAwayPipe, OrdersListBossComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				allowedDomains: ["*"],
				disallowedRoutes: []
			}
		}),
		AppRouting
	],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'es-MX'
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
	return localStorage.getItem("token");
}