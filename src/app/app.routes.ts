import { Routes } from '@angular/router';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    { path: 'welcome', component: WelcomePageComponent },
    { path: 'home', component: HomePageComponent }
];
