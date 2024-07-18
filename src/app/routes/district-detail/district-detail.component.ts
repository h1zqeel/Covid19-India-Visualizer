import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovidDataService } from '../../covidDataService.service';
import { DistrictDataItem } from '../../types';
import { ListItemComponent } from '../../list-item/list-item.component';
import { NgIf } from '@angular/common';
import '@material/web/list/list';

@Component({
  selector: 'app-district-detail',
  standalone: true,
  imports: [ListItemComponent, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './district-detail.component.html',
  styleUrls: ['./district-detail.component.css'],
})
export class DistrictDetailComponent implements OnInit {
  districtData: DistrictDataItem | undefined;

  constructor(
    private covidDataService: CovidDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const state = params['state'];
      const district = params['district'];
      if (state && district) {
        this.fetchDistrictData(state, district);
      }
    });
  }

  async fetchDistrictData(state: string, district: string): Promise<void> {
    this.districtData = await this.covidDataService.getDistrictData(
      state,
      district,
    );
  }
}
