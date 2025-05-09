import { Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';

@Component({
  selector: 'side-navbar',
  imports: [],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {

  async ngOnInit() {
    console.log("Test");
  }

}
