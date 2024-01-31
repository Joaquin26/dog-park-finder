import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DogPark } from '../entities/dog-park';

@Injectable({
  providedIn: 'root',
})
export class DogParkFinderService {
  constructor(private http: HttpClient) {}
  getNearbyParks(
    center: google.maps.LatLngLiteral
  ): Observable<Array<DogPark>> {
    const body = {
      coords: center,
      radius: 1,
      leisure: 'dog_park',
    };
    const headers = {
      'content-type': 'application/json',
      'X-RapidAPI-Key': environment.pepicanApi.key,
      'X-RapidAPI-Host': environment.pepicanApi.host,
    };
    return this.http
      .post(
        `${environment.pepicanApi.url}${environment.pepicanApi.nearbyBasic}`,
        body,
        { headers }
      )
      .pipe(
        map((response: any) => {
          return response.result.map((data: any) => {
            return {
              id: data._id,
              name: data.properties.name ?? 'Sin nombre',
              location: {
                lat: data.center_coord.coordinates[0],
                lng: data.center_coord.coordinates[1],
              },
            } as DogPark;
          });
        })
      );
  }

  getNearbyParksMock(
    center: google.maps.LatLngLiteral
  ): Observable<Array<DogPark>> {
    return this.http.get('./assets/mock/dog-parks.json').pipe(
      map((response: any) => {
        return response.result.map((data: any) => {
          return {
            id: data._id,
            name: data.properties.name ?? 'Sin nombre',
            location: {
              lat: data.center_coord.coordinates[0],
              lng: data.center_coord.coordinates[1],
            },
          };
        });
      })
    );
  }
}
