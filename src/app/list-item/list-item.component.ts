import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconManWalkComponent } from '../icons/icon-man-walk/icon-man-walk.component';
import { IconTickComponent } from '../icons/icon-tick/icon-tick.component';
import { IconCrossComponent } from '../icons/icon-cross/icon-cross.component';
import { StateIconComponent } from '../icons/state-icon/state-icon.component';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    IconManWalkComponent,
    IconTickComponent,
    IconCrossComponent,
    StateIconComponent,
  ],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListItemComponent {
  @Input() stateName: string | null = '';
  @Input() stateCode: string | null = '';
  @Input() confirmed: number | null = 0;
  @Input() deceased: number | null = 0;
  @Input() recovered: number | null = 0;
  @Input() itemType: string | null = '';
  @Output() updateStateName: EventEmitter<any> = new EventEmitter();

  handleClick() {
    this.updateStateName.emit(this.stateName);
  }
}
