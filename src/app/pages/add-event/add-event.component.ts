import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  eventForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const userId = localStorage.getItem('userId');
    if (this.eventForm.valid && userId) {
      this.apiService.createEvent(+userId, this.eventForm.value).subscribe({

      next: () => {
          this.successMessage = 'Event added successfully!';
          this.errorMessage = '';
          this.eventForm.reset();
          setTimeout(() => this.router.navigate(['/timeline']), 2000);
      },

        error: () => {
          this.errorMessage = 'Failed to add event';
        }
      });
    }
  }
}
