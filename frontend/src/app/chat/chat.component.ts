import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import apiClient from '../config/axiosConfig';
import { AuthService } from '../auth/auth.service';
import { Group } from '../../../types/Group';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  listGroupIds : string [] = [];
  listOfGroups : Group[] = []
  currentLoggedInUserId : string | null = "";

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {    
    this.currentLoggedInUserId = this.authService.getToken();
    const user = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data;
    const allGroups = (await apiClient.get("groups")).data;

    this.listGroupIds = user.group_ids;
    if(this.listGroupIds != null) {
      this.listOfGroups = allGroups.filter((group: Group) => !this.listGroupIds.includes(group.id.toString()))
    } else {
      this.listOfGroups = allGroups;
    }
  }

  
  async addGroup(groupId: number) {
    const user = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data;
    const userGroupIds: string[] = user.group_ids || [];

    if (!userGroupIds.includes(groupId.toString())) {
      userGroupIds.push(groupId.toString());
      user.group_ids = userGroupIds;

      const updatedUser = await apiClient.patch(`users/${this.currentLoggedInUserId}`, user);

      if (updatedUser.status === 200) {
        window.location.href = `/groups/${groupId}`;
      }
    } else {
      console.log("Utilisateur déjà membre du groupe.");
    }
  }


}
