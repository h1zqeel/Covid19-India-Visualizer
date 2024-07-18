import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '@material/web/icon/icon.js';

@Component({
  selector: 'app-icon-back',
  standalone: true,
  imports: [],
  templateUrl: './icon-back.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconBackComponent {}
