import { Component, OnInit } from '@angular/core';


declare const $: any;
declare interface RouteInfo
{
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;
  catId: any;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/user-dashboard', title: 'Dashboard', icon: 'dashboard', class: 'dashboard-menu-icon', children: '', catId: 2 },
  { path: '/contractor-dashboard', title: 'Dashboard', icon: 'dashboard', class: 'dashboard-menu-icon', children: '', catId: 4 },

  // { path: '/my-room', title: 'My Room',  icon: 'developer_board', class: 'dashboard-menu-icon', children: '', catId :0 },
  // { path: '/file-list', title: 'File List',  icon: 'developer_board', class: 'dashboard-menu-icon', children: '', catId :0 },
  // { path: '/rack-status', title: 'Rack Status',  icon: 'developer_board', class: 'dashboard-menu-icon', children: '', catId :0 },
  //=============Agami Admin Route With CatId=1 ================//



 
  //=============CatId=1=================//
  // { path: '/login', title: 'Logout', icon: 'logout', class: 'dashboard-menu-icon', children: '', catId: 2 },
  { path: '/employee-list', title: 'Employees', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/customers', title: 'Customers', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/company', title: 'Company', icon: 'apartment', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/raw-items', title: 'Raw Items', icon: 'store', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/period-type', title: 'Period Type', icon: 'store', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/package', title: 'Package', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/package-advance', title: 'Package Advance', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/daily-package-assign', title: 'Daily Package Assign', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/package-raw-items', title: 'Package With Raw Items', icon: 'compare_arrows', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/blood-group', title: 'Blood Group', icon: 'opacity', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/area', title: 'Area', icon: 'settings_overscan', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/sector', title: 'Sector', icon: 'line_weight', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/thana', title: 'Thana', icon: 'emoji_transportation', class: 'dashboard-menu-icon', children: '', catId: 1 },
  { path: '/post-office', title: 'Post Office', icon: 'apartment', class: 'dashboard-menu-icon', children: '', catId: 1 },
  {
    path: '/', title: 'Setting', icon: 'all_inboxv', class: 'user-menu-icon', catId: 1,
    children:
      [
        { path: '/master-setting', title: 'Master Setting', icon: 'format_size', class: 'nav-item-sub', },
        { path: '/dashbord-setting', title: 'Dashbord Setting', icon: 'format_size', class: 'nav-item-sub', },

      ]
  },
  //=============CatId=2=================//
  { path: '/user-daily-package-assign', title: 'Daily Package Assign', icon: 'wc', class: 'dashboard-menu-icon', children: '', catId: 2 },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit
{
  menuItems: any[];
  currentUser: any

  constructor()
  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit()
  {

    const result = ROUTES.filter(element =>
    {
      return element.catId === 0;
    });
    this.menuItems = result;
    console.log(this.currentUser.Details.UserTypeId);
    if (this.currentUser != null && this.currentUser.Details != null
      && this.currentUser.Details.UserTypeId == 1)
    {
      const adminMenu = ROUTES.filter(element =>
      {
        return element.catId === 1;
      });
      for (let i = 0; i < adminMenu.length; i++)
      {
        this.menuItems.push(adminMenu[i]);
      }
    }
    if (this.currentUser != null && this.currentUser.Details != null
      && this.currentUser.Details.UserTypeId == 2)
    {
      const clientMenu = ROUTES.filter(element =>
      {
        return element.catId === 3;
      });
      for (let i = 0; i < clientMenu.length; i++)
      {
        this.menuItems.push(clientMenu[i]);
      }
    }
    if (this.currentUser != null && this.currentUser.Details != null
      && this.currentUser.Details.UserTypeId == 3)
    {
      const contractorMenu = ROUTES.filter(element =>
      {
        return element.catId === 4;
      });
      for (let i = 0; i < contractorMenu.length; i++)
      {
        this.menuItems.push(contractorMenu[i]);
      }
    }
    const logoutMenu = ROUTES.filter(element =>
    {
      return element.catId === 2;
    });
    for (let i = 0; i < logoutMenu.length; i++)
    {
      this.menuItems.push(logoutMenu[i]);
    }

  }
  isMobileMenu()
  {
    if ($(window).width() > 991)
    {
      return false;
    }
    return true;
  };
}
