import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { catchError, of } from 'rxjs';
import { GeolocationService } from '../../services/geolocation.service';
import { DogPark } from '../../entities/dog-park';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.sass'],
})
export class MapViewComponent implements OnInit {
  @Input() parks: DogPark[] = [];
  @Input() parkSelected: string = '';
  @Output() centerChange = new EventEmitter<google.maps.LatLngLiteral>();
  @Output() parkSelectedChange = new EventEmitter<string>();
  @Output() registerParkChange = new EventEmitter<google.maps.LatLngLiteral>();

  @ViewChild('map') map: any;

  zoom = 16;
  center: google.maps.LatLngLiteral = {
    lat: 41.378442396701416,
    lng: 2.0965230925291145,
  };

  options: google.maps.MapOptions = {
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    this.centerChange.emit(this.center);
  }

  getCurrentPosition(): void {
    this.geolocationService
      .getCurrentPosition()
      .pipe(
        catchError((error) => {
          return of({
            coords: {
              latitude: this.center.lat,
              longitude: this.center.lng,
            },
          } as GeolocationPosition);
        })
      )
      .subscribe((position: GeolocationPosition) => {
        this.updateCenter(position);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parkSelected'] && changes['parkSelected'].currentValue != '') {
      const selectedPark = this.parks.find(
        (park) => park.id === changes['parkSelected'].currentValue
      );
      if (selectedPark) {
        this.center = selectedPark.location;
        this.map.panTo(this.center);
        this.centerChange.emit(this.center);
      }
    }
  }

  updateCenter(event: GeolocationPosition): void {
    this.center = {
      lat: event.coords.latitude,
      lng: event.coords.longitude,
    };
    this.centerChange.emit(this.center);
  }

  getIcon(id: string): string {
    return id === this.parkSelected
      ? 'assets/icons/dog-park-icon-select.png'
      : 'assets/icons/dog-park-icon.png';
  }

  onMapClick(park: DogPark): void {
    this.parkSelected = park.id;
    this.parkSelectedChange.emit(park.id);
  }

  registerPark(event: any): void {
    const coords = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    } as google.maps.LatLngLiteral;
    this.registerParkChange.emit(coords);
  }

  changeCenter(): void {
    this.center = this.map.getCenter().toJSON();
    this.centerChange.emit(this.center);
  }
}
