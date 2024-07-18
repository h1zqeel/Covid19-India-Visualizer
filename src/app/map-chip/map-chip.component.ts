import { Component } from '@angular/core';
import { IconMapComponent } from '../icon-map/icon-map.component';

@Component({
  selector: 'app-map-chip',
  standalone: true,
  imports: [IconMapComponent],
  templateUrl: './map-chip.component.html',
  styleUrl: './map-chip.component.css',
})
export class MapChipComponent {}
