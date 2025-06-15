import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  events: any[] = [];
  userId: string | null = '';
  eventForm: FormGroup;
  editMode = false;
  editingEventId: number | null = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: [''],
      description: [''],
      date: ['']
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) this.loadEvents();
  }

  loadEvents() {
    this.apiService.getAllEvents(Number(this.userId)).subscribe({
      next: (data: any[]) => this.events = data,
      error: () => alert('Failed to load events')
    });
  }

  onSubmit(): void {
    if (this.userId) {
      const data = this.eventForm.value;
      if (this.editMode && this.editingEventId !== null) {
        this.apiService.updateEvent(this.editingEventId, data).subscribe(() => {
          this.resetForm();
          this.loadEvents();
        });
      } else {
        this.apiService.createEvent(Number(this.userId), data).subscribe(() => {
          this.resetForm();
          this.loadEvents();
        });
      }
    }
  }

  onEdit(event: any): void {
    this.editMode = true;
    this.editingEventId = event.id;
    this.eventForm.patchValue({
      title: event.title,
      description: event.description,
      date: event.date
    });
  }

  onDelete(eventId: number): void {
    if (this.userId) {
      this.apiService.deleteEvent(Number(this.userId), eventId).subscribe(() => this.loadEvents());
    }
  }

  resetForm(): void {
    this.editMode = false;
    this.editingEventId = null;
    this.eventForm.reset();
  }
}

