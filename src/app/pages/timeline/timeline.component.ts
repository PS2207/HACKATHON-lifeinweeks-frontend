import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
})
export class TimelineComponent implements OnInit {
  eventForm: FormGroup;
  events: any[] = [];
  editMode = false;
  editingEventId: number | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.getAllEvents(+userId).subscribe({
        next: (data) => (this.events = data),
        error: () => {this.errorMessage = 'Failed to load events',   setTimeout(() => {
          this.errorMessage=''
        },3000)},
     
      });
    }
  }

  onSubmit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || this.eventForm.invalid) return;

    const eventData = this.eventForm.value;

    if (this.editMode && this.editingEventId !== null) {
      this.apiService.updateEvent(this.editingEventId, eventData).subscribe({
        next: () => {
            console.log('✅ Update successful');
          this.successMessage = 'Event updated successfully';
          setTimeout(()=>{
            this.successMessage=''},3000)
          this.resetForm();
          this.editMode = false;
          this.loadEvents();        
        },
        error: () => {this.errorMessage = 'Failed to update event', setTimeout(()=>{
          this.errorMessage=''},3000
        )},
      });
    } else {
      this.apiService.createEvent(+userId, eventData).subscribe({
        next: () => {
          this.successMessage = 'Event added successfully';
          setTimeout(()=>{
                this.successMessage= ''
          },3000)
          this.eventForm.reset();
          this.loadEvents();
        },
        error: () => (this.errorMessage = 'Failed to add event', setTimeout(()=>{
          this.successMessage='' ;},3000)),
      });
    }
  }

  onEdit(event: any): void {
    this.eventForm.patchValue({ title: event.title,
    description: event.description,
    date: event.date,
    category: event.category });
    this.editingEventId = event.id;
    this.editMode = true;
  }

onDelete(eventId: number): void {
  const userId = localStorage.getItem('userId');

  if (!confirm('Are you sure you want to delete this event?')) return;

  if (userId) {
    this.apiService.deleteEvent(+userId, eventId).subscribe({
      next: () => {
        this.successMessage = 'Event deleted successfully!!';
         // Auto-hide message after 3 sec
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.loadEvents(); 
       
      },
      error: () => {
        this.errorMessage = 'Failed to delete event';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
            
      }
    });
  }
}


  resetForm(): void {
    this.eventForm.reset();
    this.editMode = false;
    this.editingEventId = null;
    //this.successMessage = ''; no need to add this here,or  else update msg will not show
    this.errorMessage = '';
  }
}
