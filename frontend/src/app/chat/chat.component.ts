import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import apiClient from '../config/axiosConfig';
import { AuthService } from '../auth/auth.service';
import { Group } from '../../../types/Group';
import { Router } from '@angular/router';
import { WebSocketService } from '../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnDestroy {
  listGroupIds: string[] = [];
  listOfGroups: Group[] = [];
  currentLoggedInUserId: string | null = "";
  private messageSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {}

  async ngOnInit() {    
    this.currentLoggedInUserId = this.authService.getToken();
    const user = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data;
    const allGroups = (await apiClient.get("groups")).data;

    this.listGroupIds = user.group_ids;
    if(this.listGroupIds != null) {
      this.listOfGroups = allGroups.filter((group: Group) => !this.listGroupIds.includes(group.id.toString()));
    } else {
      this.listOfGroups = allGroups;
    }

    // S'abonner aux nouveaux messages
    this.messageSubscription = this.webSocketService.onNewMessage().subscribe(message => {
      // Mettre à jour l'interface utilisateur avec le nouveau message
      console.log('Nouveau message reçu:', message);
      // Ici, vous pouvez ajouter la logique pour mettre à jour l'affichage des messages
    });
  }

  async addGroup(groupId: number) {
    const user = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data;
    const userGroupIds: string[] = user.group_ids || [];

    if (!userGroupIds.includes(groupId.toString())) {
      userGroupIds.push(groupId.toString());
      user.group_ids = userGroupIds;

      const updatedUser = await apiClient.patch(`users/${this.currentLoggedInUserId}`, user);

      if (updatedUser.status === 200) {
        // Rejoindre le chat WebSocket avant de rediriger
        this.webSocketService.joinChat(groupId.toString());
        window.location.href = `/groups/${groupId}`;
      }
    } else {
      console.log("Utilisateur déjà membre du groupe.");
    }
  }

  ngOnDestroy() {
    // Nettoyer les souscriptions lors de la destruction du composant
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
}
