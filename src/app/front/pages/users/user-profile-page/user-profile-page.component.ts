import {Component} from '@angular/core';
import {UserWsService} from '../../../../services/billkeeper-ws/user/user-ws.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainLayoutComponent} from '../../../layouts/main-layout/main-layout.component';
import {TopBarComponent} from '../../../components/layout/top-bar/top-bar.component';
import {Fieldset} from 'primeng/fieldset';
import {User} from '../../../../services/billkeeper-ws/user/model';
import {ToastMessageService} from '../../../../services/toast-message.service';
import {NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {LayoutService} from '../../../../services/layout.service';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-user-profile-page',
  imports: [
    FormsModule,
    MainLayoutComponent,
    ReactiveFormsModule,
    TopBarComponent,
    Fieldset,
    NgIf,
    Button,
    Avatar
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent {

  currentUser: User | undefined;
  profilePicture: string = "/assets/images/profile_placeholder.png";

  constructor(
    private userWsService: UserWsService,
    private toastMessageService: ToastMessageService,
    private layoutService: LayoutService
  ) {
  }

  async ngOnInit() {
    try {
      this.currentUser = await this.userWsService.getCurrentUserProfile();
      this.profilePicture = await this.userWsService.getCurrentUserProfilePicture();
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  async onUploadProfilePicture(event: any) {
    await this.layoutService.withPageLoading(async () => {
      if (!event.target.files && !event.target.files[0]) {
        return;
      }
      await this.uploadProfilePicture(event.target.files[0]);
      this.profilePicture = await this.userWsService.getCurrentUserProfilePicture();
    });
  }

  private async uploadProfilePicture(file: File) {
    try {
      await this.userWsService.uploadCurrentUserProfilePicture(file);
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }
}
