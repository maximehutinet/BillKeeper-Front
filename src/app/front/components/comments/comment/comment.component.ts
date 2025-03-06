import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillComment} from '../../../../services/billkeeper-ws/comment/model';
import {DatePipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {UserWsService} from '../../../../services/billkeeper-ws/user/user-ws.service';
import {User} from '../../../../services/billkeeper-ws/user/model';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-comment',
  imports: [
    DatePipe,
    Button,
    NgIf,
    Avatar
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  private _comment: BillComment = {
    id: '',
    dateTime: new Date(),
    content: ""
  }

  userProfilePicture: string = "assets/images/profile_placeholder.png";

  @Input()
  set comment(comment: BillComment) {
    this._comment = comment;
    if (this._comment.user) {
      this.updateUserProfilePicture(this._comment.user);
    }
  }

  get comment() {
    return this._comment;
  }

  @Output()
  onEditEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  onDeleteEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private userWsService: UserWsService
  ) {
  }

  async updateUserProfilePicture(user: User) {
    this.userProfilePicture = await this.userWsService.getProfilePicture(user);
  }
}
