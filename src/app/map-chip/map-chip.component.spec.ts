import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapChipComponent } from './map-chip.component';

describe('MapChipComponent', () => {
  let component: MapChipComponent;
  let fixture: ComponentFixture<MapChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
