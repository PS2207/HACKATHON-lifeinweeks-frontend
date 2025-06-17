import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-login',
  standalone: true,

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log("this.loginForm.value")
      this.apiService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login Success Response:', res); // Log response
          localStorage.setItem('username', res.username);
          localStorage.setItem('userId', res.id.toString());
          this.router.navigate(['/timeline']);
        },
        error: (err) => {
          console.error('Login Error:', err); // Log error
          this.errorMessage = 'Invalid username or password.';
        }
      });
    }
  }
}
