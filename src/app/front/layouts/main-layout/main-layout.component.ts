import {Component} from '@angular/core';
import {FullScreenLoadingComponent} from '../../components/full-screen-loading/full-screen-loading.component';
import {NgIf} from '@angular/common';
import {LayoutService} from '../../../services/layout.service';
import {ValidationDialogComponent} from '../../components/validation-dialog/validation-dialog.component';
import {ToastMessageComponent} from '../../components/toast-message/toast-message.component';
import {SideMenuComponent} from '../../components/side-menu/side-menu.component';

@Component({
  selector: 'app-main-layout',
  imports: [
    FullScreenLoadingComponent,
    NgIf,
    ValidationDialogComponent,
    ToastMessageComponent,
    SideMenuComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  constructor(
    public layoutService: LayoutService
  ) {
  }

}
