import { ChangeDetectorRef, Component } from '@angular/core';
import apiClient from '../../config/axiosConfig';
import { CommonModule } from '@angular/common';
import { Group } from '../../../../types/Group';
import { GroupIconComponent } from '../group-icon/group-icon.component';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'side-navbar',
  imports: [CommonModule, GroupIconComponent],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  constructor(private authService: AuthService, private router: Router) {
  }
  currentLoggedInUserId : string | null = "";
  listGroupIds : number[] = [];
  listOfGroups: Group[] = [];
  isLoggedIn = false;

  private authSubscription!: Subscription;

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(async (status) => {
      this.isLoggedIn = status;

      if (this.isLoggedIn) {
        try {
          this.currentLoggedInUserId = this.authService.getToken();
          this.listGroupIds = (await apiClient.get(`users/${this.currentLoggedInUserId}`)).data.group_ids;
          for (const groupId of this.listGroupIds) {
            this.listOfGroups.push((await apiClient.get(`groups/${groupId}`)).data); 
          }
        } catch (error) {
          console.error("Erreur lors du fetch des groupes", error);
        }
      } else {
        this.listOfGroups = [];
      }
    });
  }

  logout() {
    sessionStorage.removeItem("token");
    this.isLoggedIn = false;
    this.listOfGroups = [];
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
