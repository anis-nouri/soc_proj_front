import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit,AfterViewInit  {
   form: FormGroup;
  @ViewChild('datetimeInput') datetimeInput!: ElementRef;

  constructor(private router:Router, private authService : AuthService,private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      datetime: [null, Validators.required],
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
      // Perform your form submission logic here
      console.log('Form submitted:', this.form.value);
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
