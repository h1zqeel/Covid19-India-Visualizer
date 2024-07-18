import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IndiaMapComponent } from './india-map/india-map.component';
import { Location, NgFor, NgIf } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { DistrictDataItem, StateData } from './types';
import { FooterComponent } from './footer/footer.component';
import { IconBackComponent } from './icons/icon-back/icon-back.component';
import { CovidDataService } from './covidDataService.service';
import '@material/web/list/list-item.js';
import '@material/web/list/list.js';
import '@material/web/button/elevated-button.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IndiaMapComponent,
    ListItemComponent,
    FooterComponent,
    IconBackComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title: string = 'covid-19-india';
  covidDataByStateDistrict: Record<string, any> | null = null;
  allStates: string[] = [];
  allStatesData: StateData[] = [];
  selectedStateData: StateData | undefined;
  selectedDistrictData: DistrictDataItem | undefined;

  constructor(
    private covidDataService: CovidDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.navigate(['']);
  }

  goBack(): void {
    const state = this.covidDataService.selectedState;
    const district = this.covidDataService.selectedDistrict;
    if (state && district) {
      this.covidDataService.setSelectedDistrict('');
      this.router.navigate(['/states', state]);
    } else if (state) {
      this.covidDataService.setSelectedState('');
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/']);
    }
  }

  isStateSelected(): boolean {
    return !!this.covidDataService.selectedState;
  }
}
