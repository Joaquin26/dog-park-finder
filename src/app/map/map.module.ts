import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { DogParkListComponent } from './components/dog-park-list/dog-park-list.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { MapRoutingModule } from './map-routing.module';
import { MainComponent } from './pages/main/main.component';
import { DogParkFinderService } from './services/dog-park-finder.service';
import { GeolocationService } from './services/geolocation.service';

@NgModule({
  declarations: [MapViewComponent, DogParkListComponent, MainComponent],
  imports: [CommonModule, MapRoutingModule, GoogleMapsModule, FormsModule],
  providers: [GeolocationService, DogParkFinderService],
})
export class MapModule {}
