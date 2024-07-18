import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '@material/web/icon/icon.js';

@Component({
  selector: 'app-icon-tick',
  standalone: true,
  imports: [],
  templateUrl: './icon-tick.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconTickComponent {}
