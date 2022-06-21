import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {LoginLayoutComponent} from "./components/login-layout/login-layout.component";
import {RegisterLayoutComponent} from "./components/register-layout/register-layout.component";

const routes: Routes = [
    {path: '', component: MainPageComponent},
    {path: 'auth', component: AuthPageComponent, children: [
            {path: 'login', component: LoginLayoutComponent},
            {path: 'register', component: RegisterLayoutComponent}
        ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
