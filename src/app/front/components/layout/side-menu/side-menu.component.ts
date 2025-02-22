import {Component} from '@angular/core';
import {NgForOf, NgIf, UpperCasePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MenuItem} from './model';
import {Avatar} from 'primeng/avatar';
import {DocumentWsService} from '../../../../services/billkeeper-ws/document/document-ws.service';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {Badge} from 'primeng/badge';
import {SideMenuService} from '../../../../services/side-menu.service';

@Component({
  selector: 'app-side-menu',
  imports: [
    NgIf,
    NgForOf,
    UpperCasePipe,
    Avatar,
    RouterLink,
    Badge
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
          link: '/'
        },
        {
          label: 'Submissions',
          icon: 'pi pi-file-check',
          link: '/submissions'
        },
        {
          label: 'Documents',
          icon: 'pi pi-file',
          link: '/documents'
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

  constructor(
    private documentWsService: DocumentWsService,
    private sideMenuService: SideMenuService,
    private toastMessageService: ToastMessageService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    try {
      this.sideMenuService.updateSideMenu.subscribe(async () => await this.updateSideMenu());
      await this.updateSideMenu();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  private async updateSideMenu() {
    try {
      const documents = await this.documentWsService.getAllOrphansDocuments();
      this.updateItemsWithDocumentBadge(documents.length);
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  private updateItemsWithDocumentBadge(documentCount: number) {
    this.items = this.items.map(item => {
      item.items?.map(child => {
        if (child.link === '/documents') {
          child.badgeValue = documentCount;
        }
        return child;
      });
      return item;
    });
  }

  isCurrentPage(route: string | undefined): boolean {
    return this.router.url === route;
  }

}
