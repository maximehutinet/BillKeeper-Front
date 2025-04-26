import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillComment} from '../../../../services/billkeeper-ws/comment/model';
import {DatePipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {UserAvatarComponent} from '../../commun/user-avatar/user-avatar.component';
import {UserDataService} from '../../../../services/user-data.service';

@Component({
  selector: 'app-comment',
  imports: [
    DatePipe,
    Button,
    NgIf,
    UserAvatarComponent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

  @Input()
  comment: BillComment = {
    id: '',
    dateTime: new Date(),
    content: ""
  }

  @Output()
  onEditEvent: EventEmitter<void> = new EventEmitter();

  @Output()
  onDeleteEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    public userDataService: UserDataService
  ) {
  }

}
