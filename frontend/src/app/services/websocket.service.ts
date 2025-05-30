import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, {
      withCredentials: true
    });
  }

  joinChat(chatId: string) {
    this.socket.emit('joinChat', chatId);
  }

  leaveChat(chatId: string) {
    this.socket.emit('leaveChat', chatId);
  }

  sendMessage(chatId: string, message: any) {
    this.socket.emit('sendMessage', { chatId, message });
  }

  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
} 