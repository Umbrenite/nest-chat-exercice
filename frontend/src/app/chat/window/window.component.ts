import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'window',
  imports: [CommonModule, MatIconModule, MatFormFieldModule, FormsModule, MatToolbarModule],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent {
  @Input() conversationId: number | null = null;

  messages = [
    { sender: 'Alice', content: 'Salut !' },
    { sender: 'Moi', content: 'Salut, ça va ?' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'Moi', content: this.newMessage });
      this.newMessage = '';
    }
  }
}
