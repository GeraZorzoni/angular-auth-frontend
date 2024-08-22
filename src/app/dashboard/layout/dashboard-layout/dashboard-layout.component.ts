import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: '',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject (AuthService)

  public user = computed ( ()=> this.authService.currentUser())

  // get user(){
  //   return this.authService.currentUser()
  // }

  onLogout(){
    this.authService.logout();
  }

}
