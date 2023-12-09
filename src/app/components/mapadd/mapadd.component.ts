import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from '@env/environment';

import { Map, NavigationControl, Marker , GeolocateControl} from 'maplibre-gl';
@Component({
  selector: 'app-mapadd',
  templateUrl: './mapadd.component.html',
  styleUrls: ['./mapadd.component.css']
})
export class MapaddComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  @Output() markerDragged = new EventEmitter<{ latitude: number; longitude: number }>();


  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // Check if mapContainer is defined before accessing nativeElement
    if (this.mapContainer) {
      const mapElement = this.mapContainer.nativeElement;
      this.initializeMap(mapElement);
    }
    
  }


  private initializeMap(mapElement: HTMLElement): void {  
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // Initialize the map
      const map = new Map({
        container: this.mapContainer.nativeElement, 
        style: `https://api.maptiler.com/maps/streets/style.json?key=${environment.apiKey}`,
        center: [longitude, latitude],
        zoom: 12 
      });

      // You can add other map controls or features here
      map.addControl(new NavigationControl());

      // Optionally, add a marker at the user's location
      const marker = new Marker({
        draggable: true
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        this.markerDragged.emit({ latitude: lngLat.lat, longitude: lngLat.lng });
        
    });
    

    }, (error) => {
      console.error('Error getting user location:', error);
    });
  }


  ngOnDestroy() {
    this.map?.remove();
  }


  
}
