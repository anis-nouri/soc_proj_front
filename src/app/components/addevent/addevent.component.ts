import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit,AfterViewInit  {
  form: FormGroup;
  now!: Date; 
  @ViewChild('datetimeInput') datetimeInput!: ElementRef;

  constructor(private router:Router, private authService : AuthService,private fb: FormBuilder,private eventService:EventService ) {
    this.now = new Date();
    const isoString = this.now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [isoString, Validators.required],
      address: ['',Validators.required],
      longitude: [''],
      latitude: ['']
    });
   }

  ngAfterViewInit(): void {
    const now = new Date();
    const isoString = now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    this.datetimeInput.nativeElement.value = isoString;
  }

  ngOnInit(): void {
   
  }

  handleMapInfo(mapInfo: any): void {
    console.log('Received map information:', mapInfo);
    // Do something with the map information in the parent component
  }

  resetForm(): void {
    this.form.reset();
    this.router.navigate(["/"])
  }

  submitForm(): void {
    if (this.form.valid) {
      const newEvent = this.form.value;  
      const username = localStorage.getItem('username');
      console.log(username);
      if (username) {
        this.eventService.createEvent(newEvent, username).subscribe(
          (response) => {
            console.log('Event added successfully:', response);
            this.router.navigate(['']);
          },
          (error) => {
            console.error('Error adding event:', error);
          }
        );
      } else {
        console.error('Username not found in localStorage');
      }
    }
  }

   onMarkerDragged(event: { latitude: number; longitude: number }): void {
    const { latitude, longitude } = event;
    this.form.patchValue({
      latitude,
      longitude
    });
  }
  
}
