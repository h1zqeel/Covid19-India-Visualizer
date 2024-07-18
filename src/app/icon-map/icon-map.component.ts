import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '@material/web/icon/icon.js';

@Component({
  selector: 'app-icon-map',
  standalone: true,
  imports: [],
  templateUrl: './icon-map.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconMapComponent {}
