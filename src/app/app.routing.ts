import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard';
import { LoginComponent } from './components/login/login.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/home/about/about.component';
import { MenuItemComponent } from './components/home/menu-item/menu-item.component';
import { ServicesComponent } from './components/home/services/services.component';
import { ContactUsComponent } from './components/home/contact-us/contact-us.component';

const routes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuItemComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '', loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
