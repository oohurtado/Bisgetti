import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/access/login/login.component";
import { anonGuard } from "./guards/anon.guard";
import { SignupComponent } from "./components/access/signup/signup.component";
import { ForbiddenComponent } from "./components/access/forbidden/forbidden.component";
import { ChangePasswordComponent } from "./components/access/change-password/change-password.component";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";

const ROUTES: Routes = [
    // { path: 'login', component: LoginComponent, canActivate: [anonGuard] },
    // { path: 'signup', component: SignupComponent, canActivate: [anonGuard] },
    // { path: 'forbidden', component: ForbiddenComponent, canActivate: [authGuard] },
    // { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
    { path: 'home', component: HomeComponent },

    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const AppRouting = RouterModule.forRoot(ROUTES, { useHash: true });