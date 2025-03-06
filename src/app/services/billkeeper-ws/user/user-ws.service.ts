import {Injectable} from '@angular/core';
import {HttpWsService} from '../http-ws.service';
import {User} from './model';

@Injectable({
  providedIn: 'root'
})
export class UserWsService {

  constructor(
    private httpWsService: HttpWsService
  ) { }

  async getCurrentUserProfile(): Promise<User> {
    return this.httpWsService.get<User>('/users/me');
  }

  async uploadCurrentUserProfilePicture(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    return this.httpWsService.post("/users/me/picture", formData);
  }

  async getProfilePicture(user: User): Promise<string> {
    const blob = await this.httpWsService.getBlob(`/users/${user.id}/picture`);
    return URL.createObjectURL(blob);
  }

  async getCurrentUserProfilePicture(): Promise<string> {
    const blob = await this.httpWsService.getBlob("/users/me/picture");
    return URL.createObjectURL(blob);
  }
}
