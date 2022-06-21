import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthPageComponent} from './pages/auth-page/auth-page.component';
import {HeaderLayoutComponent} from './components/header-layout/header-layout.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {FooterLayoutComponent} from './components/footer-layout/footer-layout.component';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {LoginLayoutComponent} from './components/login-layout/login-layout.component';
import {RegisterLayoutComponent} from './components/register-layout/register-layout.component';
import {UserAccountComponentComponent} from './components/user-account-component/user-account-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from "./services/auth.service";
import {TokenInterceptor} from "./classes/token.interceptor";
import { WeatherDetailsLayoutComponent } from './components/weather-details-layout/weather-details-layout.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { FeedbackLayoutComponent } from './components/feedback-layout/feedback-layout.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthPageComponent,
        HeaderLayoutComponent,
        MainPageComponent,
        FooterLayoutComponent,
        LoginLayoutComponent,
        RegisterLayoutComponent,
        UserAccountComponentComponent,
        WeatherDetailsLayoutComponent,
        FeedbackLayoutComponent
    ],
    imports: [
        IvyCarouselModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        GooglePlaceModule,
        BrowserAnimationsModule,
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
