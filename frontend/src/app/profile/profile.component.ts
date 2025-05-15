import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import apiClient from '../config/axiosConfig';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;
  userId: number = Number.parseInt(sessionStorage.getItem('token') || '0');

  constructor(private fb: FormBuilder, private router: Router) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      custom_profil_color: ['#333333', Validators.required],
      custom_username_color: ['#cccccc', Validators.required]
    });
  }

  async ngOnInit() {
    if (!this.userId) return;

    const response = await apiClient.get(`/users/${this.userId}`);
    this.profileForm.patchValue(response.data);
  }

  async onSubmit() {
    if (this.profileForm.valid) {
      await apiClient.patch(`/users/${this.userId}`, this.profileForm.value);
      this.router.navigate(['/']);
    }
  }
}
