import { Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { CommonModule } from '@angular/common';
import { Group } from '../../../../types/Group';
import { GroupIconComponent } from '../group-icon/group-icon.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'side-navbar',
  imports: [CommonModule, GroupIconComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  constructor(private authService: AuthService) {
  }

  listOfGroups : Group[] = [];
  isLoggedIn : boolean = false;

  async ngOnInit() {
    this.listOfGroups = (await apiClient.get("/groups")).data; 
    this.isLoggedIn = this.authService.isLoggedIn();   
  }

}
