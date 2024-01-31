import { Component, OnInit } from '@angular/core';
import { DogParkFinderService } from '../../services/dog-park-finder.service';
import { DogPark } from '../../entities/dog-park';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  parks: DogPark[] = [];
  parkSelected: string = '';
  parksDeleted: string[] = [];

  constructor(private dogParkFinderService: DogParkFinderService) {}

  ngOnInit(): void {}

  getNearbyParks(center: google.maps.LatLngLiteral): void {
    this.dogParkFinderService.getNearbyParks(center).subscribe((parks) => {
      if (this.parks.length === 0) this.parks = parks;
      else {
        parks.forEach((park: DogPark) => {
          if (
            !this.parks.some((p) => p.id === park.id) &&
            !this.parksDeleted.includes(park.id)
          )
            this.parks.push(park);
        });
      }
    });
  }

  selectPark(parkId: string): void {
    this.parkSelected = parkId;
  }

  deletePark(parkId: string): void {
    this.parks = this.parks.filter((park) => park.id !== parkId);
    if (this.parkSelected === parkId) this.parkSelected = '';
    if (!this.parksDeleted.includes(parkId)) this.parksDeleted.push(parkId);
  }

  editPark(park: DogPark): void {
    const index = this.parks.findIndex((p) => p.id === park.id);
    this.parks[index] = park;
  }

  registerPark(center: google.maps.LatLngLiteral): void {
    const id = Math.random().toString(36).substring(2, 11);
    const newPark = {
      id,
      name: 'New Park',
      location: center,
    };
    this.parks = [newPark, ...this.parks];
    this.selectPark(newPark.id);
  }
}
