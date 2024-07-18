import { Injectable } from '@angular/core';
import { DistrictDataItem } from './types';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  private allStatesData: any[] = [];
  covidDataByStateDistrict: any = {};
  allStates: string[] = [];
  selectedState: string | null = null;
  selectedDistrict: string | null = null;

  async getCovidData() {
    await fetch('https://data.covid19india.org/state_district_wise.json')
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
      })
      .finally(() => {
        this.setAllStatesData(this.allStatesData);
      });
  }

  setAllStatesData(allStatesData: any): void {
    this.allStatesData = allStatesData;
  }

  async getAllStatesData() {
    if (this.allStatesData.length === 0) await this.getCovidData();
    return this.allStatesData;
  }

  async getStateData(state: string) {
    return this.allStatesData.find(
      (s) => s.state.includes(state) || state.includes(s.state),
    );
  }

  async getDistrictData(state: string, district: string) {
    const stateData = await this.getStateData(state);
    return stateData?.districtData.find(
      (d: any) =>
        d.district.includes(district) || district.includes(d.district),
    );
  }

  setSelectedState(state: string): void {
    this.selectedState = state;
  }

  setSelectedDistrict(district: string): void {
    this.selectedDistrict = district;
  }
}
