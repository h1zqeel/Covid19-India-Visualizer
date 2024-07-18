export interface StateData {
  state: string;
  confirmed: number;
  deceased: number;
  recovered: number;
  districtData: DistrictDataItem[];
}

export interface DistrictDataItem {
  district: string;
  confirmed: number;
  deceased: number;
  recovered: number;
}
