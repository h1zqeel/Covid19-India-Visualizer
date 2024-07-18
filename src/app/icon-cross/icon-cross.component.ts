import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import '@material/web/icon/icon.js';

@Component({
  selector: 'app-icon-cross',
  standalone: true,
  imports: [],
  templateUrl: './icon-cross.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconCrossComponent {}
