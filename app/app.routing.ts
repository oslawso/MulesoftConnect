import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UsageComponent } from './usage/index';
import { DemoComponent } from './demo/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    { path: 'account/details/:userId', component: RegisterComponent , canActivate: [AuthGuard] },
    { path: 'account/usage/:userId', component: DemoComponent , canActivate: [AuthGuard] },
    // { path: 'account/usage/:userId', component: UsageComponent , canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);