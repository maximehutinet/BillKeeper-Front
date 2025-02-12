import {Component} from '@angular/core';
import {NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MenuItem} from './model';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-side-menu',
  imports: [
    NgIf,
    NgForOf,
    UpperCasePipe,
    Avatar,
    RouterLink
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {

  constructor(
    private router: Router
  ) {
  }

  items: MenuItem[] = [
    {
      label: 'Bill management',
      items: [
        {
          label: 'Bills',
          icon: 'pi pi-receipt',
          link: '/'
        },
        {
          label: 'Submissions',
          icon: 'pi pi-file-check',
          link: '/submissions'
        },
        {
          label: 'Stats',
          icon: 'pi pi-chart-bar',
          link: '/stats'
        }
      ]
    },
    {
      label: 'App',
      items: [
        {
          label: 'Settings',
          icon: 'pi pi-cog',
          link: '/settings'
        }
      ]
    }
  ];

  isCurrentPage(route: string | undefined): boolean {
    return this.router.url === route;
  }

}
