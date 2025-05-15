import { ChangeDetectorRef, Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { ActivatedRoute } from '@angular/router';
import { Discussion } from '../../../../types/Discussion';
import { CommonModule } from '@angular/common';
import { User } from '../../../../types/User';
import { ChatBubbleComponent } from '../../template/chat-bubble/chat-bubble.component';
import { AuthService } from '../../auth/auth.service';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, ChatBubbleComponent, InputComponent],
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent {
  constructor(private route: ActivatedRoute, private authService: AuthService, private cdr : ChangeDetectorRef) {}

  fetchDiscussionList: Discussion[] = [];
  fetchUserPerChat : User[] = []
  currentLoggedInUserId : number = 0;

  async ngOnInit() {
    this.currentLoggedInUserId = Number.parseInt(this.authService.getToken() as string);
    this.route.params.subscribe(async params => {
      const groupId = params['id'];

      try {
        const response = await this.fetchGroupDiscussions(groupId);
        this.fetchDiscussionList = response.data;
        for (const chat of this.fetchDiscussionList) {
          const userResponse = await this.fetchUserByUserId(chat.user_id);          
          this.fetchUserPerChat.push(userResponse.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des discussions', error);
      }      
    });
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

    this.fetchDiscussionList = [...this.fetchDiscussionList, (discussion as Discussion)];
    const userResponse = await this.fetchUserByUserId(discussion.user_id!);
    this.fetchUserPerChat = [...this.fetchUserPerChat, userResponse.data];

    this.cdr.detectChanges();

    return apiClient.post("/discussions", discussion);
  }
}
