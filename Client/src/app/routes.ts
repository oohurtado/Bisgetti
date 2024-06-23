import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { userAdminGuard } from "./guards/user-admin.guard";
import { UsersChangeRoleComponent } from "./components/administration/users/users-change-role/users-change-role.component";
import { UsersListComponent } from "./components/administration/users/users-list/users-list.component";
import { UsersComponent } from "./components/administration/users/users/users.component";
import { MyAccountChangePasswordComponent } from "./components/my-account/my-account-change-password/my-account-change-password.component";
import { MyAccountUpdatePersonalDataComponent } from "./components/my-account/my-account-update-personal-data/my-account-update-personal-data.component";
import { userCustomerGuard } from "./guards/user-customer.guard";
import { MyAccountAddressesListComponent } from "./components/my-account/my-account-addresses/my-account-addresses-list/my-account-addresses-list.component";
import { MyAccountAddressesCreateOrUpdateComponent } from "./components/my-account/my-account-addresses/my-account-addresses-create-or-update/my-account-addresses-create-or-update.component";
import { PasswordRecoveryComponent } from "./components/access/password-recovery/password-recovery.component";
import { PasswordSetComponent } from "./components/access/password-set/password-set.component";
import { roleGuard } from "./guards/role.guard";
import { general } from "./source/general";
import { MyAccountListComponent } from "./components/my-account/my-account-list/my-account-list.component";
import { MyAccountComponent } from "./components/my-account/my-account/my-account.component";

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
            { path: 'update-personal-data', component: MyAccountUpdatePersonalDataComponent, canActivate: [authGuard] },
            { path: 'change-password', component: MyAccountChangePasswordComponent, canActivate: [authGuard] },
            { path: 'addresses/list', component: MyAccountAddressesListComponent, canActivate: [userCustomerGuard] },
            { path: 'addresses/create', component: MyAccountAddressesCreateOrUpdateComponent, canActivate: [userCustomerGuard] },
            { path: 'addresses/update/:id', component: MyAccountAddressesCreateOrUpdateComponent, canActivate: [userCustomerGuard] },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });