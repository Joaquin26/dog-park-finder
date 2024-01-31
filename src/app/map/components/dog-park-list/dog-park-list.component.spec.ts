import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogParkListComponent } from './dog-park-list.component';

describe('DogParkListComponent', () => {
  let component: DogParkListComponent;
  let fixture: ComponentFixture<DogParkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogParkListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogParkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
