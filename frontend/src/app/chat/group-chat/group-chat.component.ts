import { ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { Discussion } from '../../../../types/Discussion';
import { CommonModule } from '@angular/common';
import { User } from '../../../../types/User';
import { ChatBubbleComponent } from '../../template/chat-bubble/chat-bubble.component';
import { AuthService } from '../../auth/auth.service';
import { InputComponent } from '../input/input.component';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, ChatBubbleComponent, InputComponent],
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent implements OnDestroy, AfterViewInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private webSocketService: WebSocketService,
    private router: Router
  ) {}

  fetchDiscussionList: Discussion[] = [];
  fetchUserPerChat: User[] = [];
  currentLoggedInUserId: number = 0;
  private messageSubscription: Subscription | null = null;
  private currentGroupId: string = '';

  async ngOnInit() {
    this.currentLoggedInUserId = Number.parseInt(this.authService.getToken() as string);
    this.route.params.subscribe(async params => {
      const groupId = params['id'];
      this.currentGroupId = groupId;

      // Rejoindre le chat WebSocket
      this.webSocketService.joinChat(groupId);

      // S'abonner aux messages WebSocket
      this.messageSubscription = this.webSocketService.onNewMessage().subscribe(async (message: Discussion) => {
        // Vérifier si le message est pour ce groupe
        if (message.group_id === this.currentGroupId) {
          // Ajouter le message à la liste
          this.fetchDiscussionList.push(message);
          
          // Récupérer les informations de l'utilisateur
          const userResponse = await this.fetchUserByUserId(message.user_id);
          this.fetchUserPerChat.push(userResponse.data);
          
          // Forcer la mise à jour de la vue
          this.cdr.detectChanges();
          
          // Scroll vers le bas
          this.forceScrollToBottom();
        }
      });

      try {
        const response = await this.fetchGroupDiscussions(Number.parseInt(groupId));
        this.fetchDiscussionList = response.data;
        for (const chat of this.fetchDiscussionList) {
          const userResponse = await this.fetchUserByUserId(chat.user_id);          
          this.fetchUserPerChat.push(userResponse.data);
        }
        this.cdr.detectChanges();
        this.forceScrollToBottom();
      } catch (error) {
        console.error('Erreur lors de la récupération des discussions', error);
      }      
    });
  }

  ngAfterViewInit() {
    this.forceScrollToBottom();
  }

  private forceScrollToBottom(): void {
    setTimeout(() => {
      const element = this.chatContainer?.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 100);
  }

  async leaveGroup() {
    try {
      const user = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data;
      const userGroupIds: string[] = user.group_ids || [];
      
      const updatedGroupIds = userGroupIds.filter(id => id !== this.currentGroupId);
      user.group_ids = updatedGroupIds;

      await apiClient.patch(`users/${this.currentLoggedInUserId}`, user);
      this.webSocketService.leaveChat(this.currentGroupId);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erreur lors de la sortie du groupe', error);
    }
  }

  fetchGroupDiscussions(group_id: number) {
    return apiClient.get<Discussion[]>(`/discussions/group/${group_id}`);
  }

  fetchUserByUserId(user_id: number) {
    return apiClient.get<User>(`/users/${user_id}`);
  }

  async handleMessage(msg: string) {
    const discussion: Partial<Discussion> = {
      message: msg,
      user_id: Number.parseInt(this.authService.getToken() as string),
      group_id: this.route.snapshot.paramMap.get('id') as string,
      timestamp: new Date()
    };

    // Envoyer le message via WebSocket
    this.webSocketService.sendMessage(this.currentGroupId, discussion);

    // Envoyer le message à l'API pour persistance
    await apiClient.post("/discussions", discussion);
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
}
