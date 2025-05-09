import { Component } from '@angular/core';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { WindowComponent } from './window/window.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [ConversationListComponent, WindowComponent, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  selectedConversationId: number | null = null;

  onConversationSelected(id: number) {
    this.selectedConversationId = id;
  }
}
