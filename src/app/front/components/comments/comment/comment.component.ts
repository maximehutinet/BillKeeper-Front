import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BillComment} from '../../../../services/billkeeper-ws/comment/model';
import {DatePipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-comment',
  imports: [
    DatePipe,
    Button,
    NgIf
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
}
