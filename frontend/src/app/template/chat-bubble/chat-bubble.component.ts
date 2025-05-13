import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  imports: [CommonModule],
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent {
  @Input() message: string = '';
  @Input() timestamp: string = '';
  @Input() isUserMessage: boolean = true;
  @Input() username: string = '';
  @Input() chatBubbleColor: string = '';
  @Input() chatUsernameColor: string = '';
}