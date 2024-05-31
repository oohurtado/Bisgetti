import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { ForbiddenComponent } from "./components/access/forbidden/forbidden.component";
import { ChangePasswordComponent } from "./components/access/change-password/change-password.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import { UaUsersComponent } from "./components/user-admin/options/users/ua-users/ua-users.component";
import { UaUsersListComponent } from "./components/user-admin/options/users/ua-users-list/ua-users-list.component";
import { userAdminGuard } from "./guards/user-admin.guard";
import { UaUsersChangeUserRoleComponent } from "./components/user-admin/options/users/ua-users-change-user-role/ua-users-change-user-role.component";
import { UaUsersUserEditorComponent } from "./components/user-admin/options/users/ua-users-user-editor/ua-users-user-editor.component";

const ROUTES: Routes = [
    // { path: 'forbidden', component: ForbiddenComponent, canActivate: [authGuard] },
    // { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'access/login', component: LoginComponent, canActivate: [anonGuard] },
    { path: 'access/signup', component: SignupComponent, canActivate: [anonGuard] },
    { 
        path: 'ua/options/users', component:  UaUsersComponent,
        children:[
            { path: 'list', component: UaUsersListComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'new-user', component: UaUsersUserEditorComponent, canActivate: [authGuard, userAdminGuard] },
            { path: 'change-user-role/:id', component: UaUsersChangeUserRoleComponent, canActivate: [authGuard, userAdminGuard] },
            { path: '**', pathMatch: 'full', redirectTo: 'list' }
        ]
    },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });