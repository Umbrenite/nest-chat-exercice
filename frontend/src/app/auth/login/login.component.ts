import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import apiClient from '../../config/axiosConfig';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorsList : string[] = []

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.errorsList = [];
    if (this.loginForm.valid) {
      const res = await apiClient.post("/users/login", this.loginForm.value);

      if (res.data.success === true) {
        const userId = res.data.user.id.toString();
        sessionStorage.setItem("token", userId);
        this.authService.login(userId);
        this.router.navigate([""]);
      } else {
        this.errorsList = ["Adresse mail ou mot de passe incorrect"]
      }
    } else {
      this.errorsList = ["Formulaire invalide, veuillez le compléter"];
    }
  }
}
