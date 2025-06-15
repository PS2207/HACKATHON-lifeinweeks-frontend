import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }
/*
  onSubmit(): void {
  if (this.registerForm.valid) {
    const formValue = this.registerForm.value;

    // Format birthDate: convert to 'YYYY-MM-DD'
    const rawDate = new Date(formValue.birthDate);
    formValue.birthDate = rawDate.toISOString().split('T')[0];

    this.http.post('http://localhost:8081/api/user/register', formValue).subscribe({
      next: () => {
        this.successMessage = 'Registration successful! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Registration error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Try again.';
      }
    });
  }
}

*/
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8081/api/user/register', this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Registration error:', err);
          this.errorMessage = err.error?.message || 'Registration failed. Try again.';
        }
      });
    }
  } 
}
  