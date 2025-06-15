import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service'; // ✅ Correct import

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
      this.apiService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('username', this.loginForm.value.username);
          this.router.navigate(['/timeline']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password.';
        }
      });
    }
  }
}
