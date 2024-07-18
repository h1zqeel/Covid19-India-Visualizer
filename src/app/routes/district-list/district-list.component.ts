import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidDataService } from '../../covidDataService.service';
import { DistrictDataItem } from '../../types';
import { ListItemComponent } from '../../list-item/list-item.component';
import { NgFor, NgIf } from '@angular/common';
import '@material/web/list/list';

@Component({
  selector: 'app-district-list',
  standalone: true,
  imports: [ListItemComponent, NgFor, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css'],
})
export class DistrictListComponent implements OnInit {
  districts: DistrictDataItem[] = [];

  constructor(
    private router: Router,
    private covidDataService: CovidDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const state = params['state'];
      if (state) {
        this.fetchDistrictData(state);
      }
    });
  }

  async fetchDistrictData(state: string): Promise<void> {
    const data = await this.covidDataService.getStateData(state);
    this.districts = data?.districtData ?? [];
  }

  onSelectDistrict(district: string): void {
    const state = this.activatedRoute.snapshot.params['state'];
    this.covidDataService.setSelectedDistrict(district);
    this.router.navigate(['/states', state, 'districts', district]);
  }
}
