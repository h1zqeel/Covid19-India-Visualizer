import { Component } from '@angular/core';
import { MapChipComponent } from '../map-chip/map-chip.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MapChipComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
