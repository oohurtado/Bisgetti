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
import { PageQuickMenuComponent } from './components/_shared/page/page-quick-menu/page-quick-menu.component';
import { ProcessingComponent } from './components/_shared/processing/processing.component';
import { AuthInterceptorService } from './services/common/auth-interceptor.service';
import { UsersChangeRoleComponent } from './components/administration/users/users-change-role/users-change-role.component';
import { UsersListComponent } from './components/administration/users/users-list/users-list.component';
import { UsersComponent } from './components/administration/users/users/users.component';
import { RoleStrPipe } from './pipes/role-str.pipe';
import { MyAccountUpdatePersonalDataComponent } from './components/my-account/my-account-update-personal-data/my-account-update-personal-data.component';
import { MyAccountChangePasswordComponent } from './components/my-account/my-account-change-password/my-account-change-password.component';
import { MyAccountAddressesListComponent } from './components/my-account/my-account-addresses/my-account-addresses-list/my-account-addresses-list.component';
import { MyAccountAddressesCreateOrUpdateComponent } from './components/my-account/my-account-addresses/my-account-addresses-create-or-update/my-account-addresses-create-or-update.component';
import { PasswordRecoveryComponent } from './components/access/password-recovery/password-recovery.component';
import { PasswordSetComponent } from './components/access/password-set/password-set.component';
import { MyAccountListComponent } from './components/my-account/my-account-list/my-account-list.component';
import { MyAccountComponent } from './components/my-account/my-account/my-account.component';
import { MenuOptionsComponent } from './components/administration/menu-options/menu-options/menu-options.component';
import { MenuBuilderComponent } from './components/administration/menu-options/menu-builder/menu-builder.component';
import { MenusComponent } from './components/administration/menu-options/menus/menus.component';
import { CategoriesComponent } from './components/administration/menu-options/categories/categories.component';
import { ProductsComponent } from './components/administration/menu-options/products/products.component';

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
		PageQuickMenuComponent,
		ProcessingComponent,		
		RoleStrPipe,
		MyAccountUpdatePersonalDataComponent,
		MyAccountListComponent,
		MyAccountChangePasswordComponent,
  		MyAccountAddressesListComponent,
  		MyAccountAddressesCreateOrUpdateComponent,
		PasswordRecoveryComponent,
		PasswordSetComponent,
		MyAccountComponent,
		MenuOptionsComponent,
		MenuBuilderComponent,
		MenusComponent,
		CategoriesComponent,
		ProductsComponent,
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
			useValue: 'es-MX' },
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