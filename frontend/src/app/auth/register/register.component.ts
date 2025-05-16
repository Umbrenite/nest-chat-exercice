import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import apiClient from '../../config/axiosConfig';



@Component({
  selector: 'register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      custom_profil_color: ['', Validators.required],
      custom_username_color: ['', Validators.required],
    });
  }

  async onSubmit() {    
    const checkIfUserEmailExists = await apiClient.post("/users/email/checkIfEmailExists", {email: this.registerForm.value.email});    
    if (this.registerForm.valid && checkIfUserEmailExists.data.exists === false) {
      await apiClient.post("/users", this.registerForm.value);
      this.router.navigate(["/login"]);
    }
    return null;
  }
}
