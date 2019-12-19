import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './home/about/about.component';
import { MenuItemComponent } from './home/menu-item/menu-item.component';
import { ServicesComponent } from './home/services/services.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AboutComponent,
    MenuItemComponent,
    ServicesComponent,
    ContactUsComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ]
})
export class ComponentsModule { }
