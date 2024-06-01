import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { userAdminGuard } from "./guards/user-admin.guard";
import { UaUsersComponent } from "./components/administration/ua-users/ua-users/ua-users.component";
import { UaUsersListComponent } from "./components/administration/ua-users/ua-users-list/ua-users-list.component";
import { UaUsersCreateUserComponent } from "./components/administration/ua-users/ua-users-create-user/ua-users-create-user.component";
import { UaUsersChangeRoleComponent } from "./components/administration/ua-users/ua-users-change-role/ua-users-change-role.component";

const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'access/login', component: LoginComponent, canActivate: [anonGuard] },
    { path: 'access/signup', component: SignupComponent, canActivate: [anonGuard] },
    { 
        path: 'ua/users', component:  UaUsersComponent,
        children:[
            { path: 'list', component: UaUsersListComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'create-user', component: UaUsersCreateUserComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'change-role/:id', component: UaUsersChangeRoleComponent, canActivate: [authGuard, userAdminGuard] },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });