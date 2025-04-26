import { Injectable } from '@angular/core';
import {User} from './billkeeper-ws/user/model';
import {UserWsService} from './billkeeper-ws/user/user-ws.service';
import {ToastMessageService} from './toast-message.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _currentUser: User | undefined;

  constructor(
    private userWsService: UserWsService,
    private toastMessageService: ToastMessageService
  ) { }

  async init() {
    try {
      if (!this._currentUser) {
        this._currentUser = await this.userWsService.getCurrentUserProfile();
      }
    } catch (e) {
      this.toastMessageService.displayError(e);
    }
  }

  public getCurrentUser(): User {
    return this._currentUser!;
  }
}
