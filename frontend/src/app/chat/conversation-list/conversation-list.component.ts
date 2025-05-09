import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'conversation-list',
  imports: [CommonModule, MatListModule],
  templateUrl: './conversation-list.component.html',
  styleUrl: './conversation-list.component.scss'
})
export class ConversationListComponent {
  @Output() selectConversation = new EventEmitter<number>();

  conversations = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  select(id: number) {
    this.selectConversation.emit(id);
  }
}
