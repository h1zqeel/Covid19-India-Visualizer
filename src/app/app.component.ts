import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndiaMapComponent } from './india-map/india-map.component';
import { NgFor, NgIf } from '@angular/common';
import { ListItemComponent } from './list-item/list-item.component';
import { DistrictDataItem, StateData } from './types';
import { FooterComponent } from './footer/footer.component';
import '@material/web/list/list-item.js';
import '@material/web/list/list.js';
import '@material/web/button/elevated-button.js';
import { IconBackComponent } from './icon-back/icon-back.component';

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
  selectedState: string | null = null;
  selectedDistrict: string | null = null;
  allStatesData: StateData[] = [];
  selectedStateData: StateData | undefined;
  selectedDistrictData: DistrictDataItem | undefined;

  ngOnInit(): void {
    this.getCovidData();
  }

  getCovidData(): void {
    fetch('https://data.covid19india.org/state_district_wise.json')
      .then((response) => response.json())
      .then((data) => {
        this.covidDataByStateDistrict = data;
        this.allStates = Object.keys(data).filter(
          (state) => state !== 'State Unassigned',
        );
        this.allStates.map((state) => {
          const stateData = data[state];
          const confirmed = Object.values(stateData.districtData).reduce(
            (acc: number, district: any) => acc + district.confirmed,
            0,
          );
          const deceased = Object.values(stateData.districtData).reduce(
            (acc: number, district: any) => acc + district.deceased,
            0,
          );
          const recovered = Object.values(stateData.districtData).reduce(
            (acc: number, district: any) => acc + district.recovered,
            0,
          );

          const districtData: DistrictDataItem[] = Object.keys(
            stateData.districtData,
          ).map((district) => {
            const districtInfo = stateData.districtData[district];
            return {
              district,
              confirmed: districtInfo.confirmed,
              deceased: districtInfo.deceased,
              recovered: districtInfo.recovered,
            };
          });

          this.allStatesData.push({
            state,
            confirmed,
            deceased,
            recovered,
            districtData,
          });
        });
      });
  }

  setSelectedState(state: string): void {
    this.selectedState = state;
    this.selectedStateData = this.allStatesData.find((stateData) =>
      stateData.state.includes(state),
    );
  }

  setSelectedDistrict(district: string): void {
    this.selectedDistrict = district;
    this.selectedDistrictData = this.selectedStateData?.districtData.find(
      (districtData) =>
        districtData.district.includes(district) ||
        district.includes(districtData.district),
    );
  }

  goBack(): void {
    if (this.selectedDistrict && this.selectedStateData) {
      this.selectedDistrict = null;
      this.selectedDistrictData = undefined;
    } else if (this.selectedState) {
      this.selectedState = null;
      this.selectedStateData = undefined;
    }
  }
}
