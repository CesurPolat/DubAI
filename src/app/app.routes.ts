import { Routes } from '@angular/router';
import { WelcomePageComponent } from './features/welcome/welcome-page/welcome-page.component';
import { HomePageComponent } from './features/home/home-page/home-page.component';

export const routes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'home', component: HomePageComponent }
];
