import {Component} from '@angular/core';
import {Menu} from 'primeng/menu';
import {NgIf} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [
    Menu,
    NgIf,
    RouterLink
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  items: MenuItem[] = [
    {
      label: 'Bill management',
      items: [
        {
          label: 'Bills',
          icon: 'pi pi-receipt',
          route: '/'
        },
        {
          label: 'Submissions',
          icon: 'pi pi-file-check',
          route: '/submissions'
        },
        {
          label: 'Stats',
          icon: 'pi pi-chart-bar',
          url: '/'
        }
      ]
    },
    {
      label: 'App',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          route: '/'
        }
      ]
    }
  ];

}
