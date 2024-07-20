import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { userAdminGuard } from "./guards/user-admin.guard";
import { UsersChangeRoleComponent } from "./components/administration/users/users-change-role/users-change-role.component";
import { UsersListComponent } from "./components/administration/users/users-list/users-list.component";
import { UsersComponent } from "./components/administration/users/users.component";
import { ChangePasswordComponent } from "./components/my-account/change-password/change-password.component";
import { UpdatePersonalDataComponent } from "./components/my-account/update-personal-data/update-personal-data.component";
import { userCustomerGuard } from "./guards/user-customer.guard";
import { AddressesListComponent } from "./components/my-account/addresses/addresses-list/addresses-list.component";
import { AddressesCreateOrUpdateComponent } from "./components/my-account/addresses/addresses-create-or-update/addresses-create-or-update.component";
import { PasswordRecoveryComponent } from "./components/access/password-recovery/password-recovery.component";
import { PasswordSetComponent } from "./components/access/password-set/password-set.component";
import { roleGuard } from "./guards/role.guard";
import { general } from "./source/general";
import { MyAccountListComponent } from "./components/my-account/my-account-list/my-account-list.component";
import { MyAccountComponent } from "./components/my-account/my-account.component";
import { userBossGuard } from "./guards/user-boss.guard";
import { MenuStuffListComponent } from "./components/administration/menu-stuff/menu-stuff-list/menu-stuff-list.component";
import { CategoriesCreateOrUpdateComponent } from "./components/administration/menu-stuff/categories/categories-create-or-update/categories-create-or-update.component";
import { CategoriesListComponent } from "./components/administration/menu-stuff/categories/categories-list/categories-list.component";
import { CategoriesComponent } from "./components/administration/menu-stuff/categories/categories.component";
import { MenuStuffComponent } from "./components/administration/menu-stuff/menu-stuff.component";
import { MenusCreateOrUpdateComponent } from "./components/administration/menu-stuff/menus/menus-create-or-update/menus-create-or-update.component";
import { MenusListComponent } from "./components/administration/menu-stuff/menus/menus-list/menus-list.component";
import { MenusComponent } from "./components/administration/menu-stuff/menus/menus.component";
import { ProductsCreateOrUpdateComponent } from "./components/administration/menu-stuff/products/products-create-or-update/products-create-or-update.component";
import { ProductsListComponent } from "./components/administration/menu-stuff/products/products-list/products-list.component";
import { ProductsComponent } from "./components/administration/menu-stuff/products/products.component";
import { AddressesComponent } from "./components/my-account/addresses/addresses.component";
import { MenusBuilderComponent } from "./components/administration/menu-stuff/menus/menus-builder/menus-builder.component";

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'access/login', component: LoginComponent, canActivate: [anonGuard] },
    { path: 'access/signup', component: SignupComponent, canActivate: [anonGuard] },
    { path: 'access/password-recovery', component: PasswordRecoveryComponent, canActivate: [anonGuard] },
    { path: 'access/password-set/:email/:token', component: PasswordSetComponent, canActivate: [anonGuard] },
    {
        path: 'users', component:  UsersComponent,
        children:[
            { path: 'list', component: UsersListComponent, canActivate: [roleGuard], data: { roles: [general.LS_ROLE_USER_ADMIN, general.LS_ROLE_USER_BOSS] } },
            { path: 'change-role/:userId/:userEmail/:userRole', component: UsersChangeRoleComponent, canActivate: [roleGuard], data: { roles: [general.LS_ROLE_USER_ADMIN] } },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },
    {
        path: 'my-account', component:  MyAccountComponent,
        children:[
            { path: 'list', component: MyAccountListComponent, canActivate: [authGuard] },
            { path: 'update-personal-data', component: UpdatePersonalDataComponent, canActivate: [authGuard] },
            { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
            { 
                path: 'addresses', component: AddressesComponent,
                children:[
                    { path: 'list', component: AddressesListComponent, canActivate: [userCustomerGuard] },
                    { path: 'create', component: AddressesCreateOrUpdateComponent, canActivate: [userCustomerGuard] },
                    { path: 'update/:id', component: AddressesCreateOrUpdateComponent, canActivate: [userCustomerGuard] },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },
    {
        path: 'menu-stuff', component:  MenuStuffComponent,
        children:[
            { path: 'list', component: MenuStuffListComponent, canActivate: [userBossGuard] },
            { 
                path: 'menus', component: MenusComponent,
                children: [
                    { path: 'list', component: MenusListComponent, canActivate: [userBossGuard] },
                    { path: 'create', component: MenusCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: 'update/:id', component: MenusCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: 'builder/:id', component: MenusBuilderComponent, canActivate: [userBossGuard] },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            { 
                path: 'categories', component: CategoriesComponent,
                children: [
                    { path: 'list', component: CategoriesListComponent, canActivate: [userBossGuard] },
                    { path: 'create', component: CategoriesCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: 'update/:id', component: CategoriesCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },
            { 
                path: 'products', component: ProductsComponent,
                children: [
                    { path: 'list', component: ProductsListComponent, canActivate: [userBossGuard] },
                    { path: 'create', component: ProductsCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: 'update/:id', component: ProductsCreateOrUpdateComponent, canActivate: [userBossGuard] },
                    { path: '**', pathMatch: 'full', redirectTo: 'list' }
                ]
            },            
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });