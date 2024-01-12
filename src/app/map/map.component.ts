import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import {evenement}  from '../models/evenement.model';
import { Map, NavigationControl, Marker, Popup, GeolocateControl } from 'maplibre-gl';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(private eventService: EventService) { }

  events: evenement[] = [];
  getAllEvents(map: Map): void {
    this.eventService.getAllEvents().subscribe(
      (events: evenement[]) => {
        this.events = events;
        for (const evenement of this.events) {
          console.log('Received events:', evenement);
          const { latitude: eventLatitude, longitude: eventLongitude, title, date, description, user } = evenement;
          const  authenticatedUser= localStorage.getItem("username");
          const isCurrentUserEvent = authenticatedUser && user && user.username === authenticatedUser ;
          const markerColor = isCurrentUserEvent ? '#0000FF' : '#FF0000';
          const marker = new Marker({ color: markerColor })
            .setLngLat([eventLongitude, eventLatitude])
            .addTo(map);
  
          const popup = new Popup()
            .setHTML(`<strong>${title}</strong><br>${date}<br>${description}`);
  
          marker.setPopup(popup);
  
          marker.getElement()?.addEventListener('mouseenter', () => {
            marker.togglePopup(); // Show the popup on hover
          });
  
          marker.getElement()?.addEventListener('mouseleave', () => {
            marker.togglePopup(); // Hide the popup when not hovering
          });
        }
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${environment.apiKey}`,
        center: [longitude, latitude],  
        zoom: 12
      });

      this.map.addControl(new NavigationControl());
      this.getAllEvents(this.map);

      this.map.addControl(
        new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );

     
    });
  }


  ngOnDestroy() {
    this.map?.remove();
  }

}
