import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'chat-input',
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  message: string = "";

  @Output() sendMessage = new EventEmitter<string>();

  async onSubmit() { 
    if (this.message.trim()) {
      this.sendMessage.emit(this.message.trim());
      this.message = '';
    }
  }
}
