import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor ( private authService: AuthService ) {}

  items: MenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/']
    },
    {
      label: 'Orders',
      icon: 'pi pi-fw pi-file-edit',
      routerLink: ['/orders']
    },
    {
        label: 'Tables',
        icon: 'pi pi-fw pi-filter',
        routerLink: ['/tables']
    },
    {
        label: 'Products',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/products']
    },
    {
      label: 'Kitchen View',
      icon: 'pi pi-fw pi-calendar',
      routerLink: ['/kitchen-view']
    }
  ];

  options: MenuItem[] = [
    {
        label: 'Theme',
        icon: 'pi pi-palette',
        command: () => {
            console.log('Change Mode')
        }
    },
    { label: 'About', icon: 'pi pi-info-circle', url: 'http://github.com' },
    { separator: true },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => { this.onLogout() }}
  ];

  ngOnInit() {
    
  }

  onLogout(): void {
    this.authService.logout();
  }

}
