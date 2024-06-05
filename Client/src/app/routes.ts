import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { userAdminGuard } from "./guards/user-admin.guard";
import { UsersChangeRoleComponent } from "./components/administration/users/users-change-role/users-change-role.component";
import { UsersCreateUserComponent } from "./components/administration/users/users-create-user/users-create-user.component";
import { UsersListComponent } from "./components/administration/users/users-list/users-list.component";
import { UsersComponent } from "./components/administration/users/users/users.component";
import { PersonalDataComponent } from "./components/my-account/base/personal-data/personal-data.component";
import { BaseComponent } from "./components/my-account/base/base.component";
import { ChangePasswordComponent } from "./components/my-account/base/change-password/change-password.component";

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'access/login', component: LoginComponent, canActivate: [anonGuard] },
    { path: 'access/signup', component: SignupComponent, canActivate: [anonGuard] },
    { 
        path: 'administration/users', component:  UsersComponent,
        children:[
            { path: 'list', component: UsersListComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'create-user', component: UsersCreateUserComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'change-role/:userId/:userEmail/:userRole', component: UsersChangeRoleComponent, canActivate: [authGuard, userAdminGuard] },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },        
    { path: 'my-account', component: BaseComponent, canActivate: [authGuard] },
    { path: 'my-account/personal-data', component: PersonalDataComponent, canActivate: [authGuard] },
    { path: 'my-account/change-password', component: ChangePasswordComponent, canActivate: [authGuard] },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });