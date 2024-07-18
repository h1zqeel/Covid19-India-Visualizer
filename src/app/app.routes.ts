import { Routes } from '@angular/router';
import { StateListComponent } from './routes/state-list/state-list.component';
import { DistrictListComponent } from './routes/district-list/district-list.component';
import { DistrictDetailComponent } from './routes/district-detail/district-detail.component';

export const routes: Routes = [
  { path: 'states', component: StateListComponent },
  { path: 'states/:state', component: DistrictListComponent },
  {
    path: 'states/:state/districts/:district',
    component: DistrictDetailComponent,
  },
  { path: '**', redirectTo: 'states' },
];
