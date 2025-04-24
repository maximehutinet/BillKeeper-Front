import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../../services/billkeeper-ws/user/model';
import {NgForOf} from '@angular/common';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-suggested-users-menu',
  imports: [
    NgForOf,
    Avatar
  ],
  templateUrl: './suggested-users-menu.component.html',
  styleUrl: './suggested-users-menu.component.scss'
})
export class SuggestedUsersMenuComponent {

  @Input()
  users: User[] = []

  @Output()
  onClickUser: EventEmitter<User> = new EventEmitter();

}
