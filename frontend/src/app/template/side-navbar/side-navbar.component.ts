import { Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { CommonModule } from '@angular/common';
import { Group } from '../../../../types/Group';

@Component({
  selector: 'side-navbar',
  imports: [CommonModule],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {

  listOfGroups : Group[] = [];

  async ngOnInit() {
    this.listOfGroups = (await apiClient.get("/groups")).data;    
  }

}
