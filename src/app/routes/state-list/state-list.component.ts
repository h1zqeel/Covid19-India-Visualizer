import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CovidDataService } from '../../covidDataService.service';
import '@material/web/list/list';
import { NgFor } from '@angular/common';
import { ListItemComponent } from '../../list-item/list-item.component';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-state-list',
  standalone: true,
  imports: [NgFor, ListItemComponent],
  template: `
    <md-list>
      <app-list-item
        (updateName)="onSelectState(state.state)"
        *ngFor="let state of states"
        [itemType]="'State'"
        [name]="state.state"
        [confirmed]="state.confirmed"
        [recovered]="state.recovered"
        [deceased]="state.deceased"
      ></app-list-item>
    </md-list>
  `,
})
export class StateListComponent {
  states: any = null;

  constructor(
    private covidDataService: CovidDataService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.states = await this.covidDataService.getAllStatesData();
  }

  onSelectState(state: string): void {
    this.covidDataService.setSelectedState(state);
    this.router.navigate(['/states', state]);
  }
}
