import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DogPark } from '../../entities/dog-park';

@Component({
  selector: 'app-dog-park-list',
  templateUrl: './dog-park-list.component.html',
  styleUrls: ['./dog-park-list.component.sass'],
})
export class DogParkListComponent implements OnInit {
  @Input() parks: DogPark[] = [];
  @Input() parkSelectedId = '';

  @Output() parkEdited = new EventEmitter<DogPark>();
  @Output() parkSelected = new EventEmitter<string>();
  @Output() parkDeleted = new EventEmitter<string>();

  editParkId = '';
  nameEditPark = '';

  constructor() {}

  ngOnInit(): void {}

  selectPark(park: DogPark): void {
    this.parkSelected.emit(park.id);
  }

  editPark(park: DogPark): void {
    this.cancelEdit();
    this.editParkId = park.id;
    this.nameEditPark = park.name;
  }

  deletePark(park: DogPark): void {
    this.parkDeleted.emit(park.id);
  }

  isEditing(park: DogPark): boolean {
    return this.editParkId === park.id;
  }

  isParkSelected(park: DogPark): boolean {
    return this.parkSelectedId === park.id;
  }

  cancelEdit(): void {
    this.parks = this.parks.map((park) => {
      if (park.id === this.editParkId) {
        park.name = this.nameEditPark;
      }
      return park;
    });
    this.editParkId = '';
    this.nameEditPark = '';
  }

  savePark(park: DogPark): void {
    this.editParkId = '';
    this.parkEdited.emit(park);
  }
}
