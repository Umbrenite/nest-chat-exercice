import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import apiClient from '../../config/axiosConfig';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const res = await apiClient.post("/users/login", this.loginForm.value);

      if (res.data.success === true) {
        const userId = res.data.user.id.toString();
        sessionStorage.setItem("token", userId);
        this.authService.login(userId);
        this.router.navigate([""]);
      }
    }
  }
}
