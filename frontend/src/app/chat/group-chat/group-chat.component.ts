import { Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { ActivatedRoute } from '@angular/router';
import { Discussion } from '../../../../types/Discussion';
import { CommonModule } from '@angular/common';
import { User } from '../../../../types/User';
import { ChatBubbleComponent } from '../../template/chat-bubble/chat-bubble.component';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, ChatBubbleComponent],
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss']
})
export class GroupChatComponent {
  constructor(private route: ActivatedRoute) {}

  fetchDiscussionList: Discussion[] = [];
  fetchUserPerChat : User[] = []

  async ngOnInit() {
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
}
