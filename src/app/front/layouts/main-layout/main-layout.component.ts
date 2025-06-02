import {Component} from '@angular/core';
import {FullScreenLoadingComponent} from '../../components/commun/full-screen-loading/full-screen-loading.component';
import {NgIf} from '@angular/common';
import {LayoutService} from '../../../services/layout.service';
import {ValidationDialogComponent} from '../../components/commun/validation-dialog/validation-dialog.component';
import {ToastMessageComponent} from '../../components/commun/toast-message/toast-message.component';
import {SideMenuComponent} from '../../components/layout/side-menu/side-menu.component';
import {FullScreenFocusingComponent} from '../../components/commun/full-screen-focusing/full-screen-focusing.component';
import {LocalStorageKeys} from '../../../services/model/commun';


@Component({
  selector: 'app-main-layout',
  imports: [
    FullScreenLoadingComponent,
    NgIf,
    ValidationDialogComponent,
    ToastMessageComponent,
    SideMenuComponent,
    FullScreenFocusingComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  menuOpen = true;
  transitionAnimationActive = false;

  constructor(
    public layoutService: LayoutService
  ) {
  }

  ngOnInit() {
    this.updateMenuStateFromLocalStorage();
  }

  onMenuOpenChange(isOpen: boolean) {
    this.transitionAnimationActive = true;
    localStorage.setItem(LocalStorageKeys.MENU_STATE, isOpen ? "open": "closed");
  }

  private updateMenuStateFromLocalStorage() {
    const lastValue = localStorage.getItem(LocalStorageKeys.MENU_STATE);
    this.menuOpen = lastValue !== "closed";
  }

}
