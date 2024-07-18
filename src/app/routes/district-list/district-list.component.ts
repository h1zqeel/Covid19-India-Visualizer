import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidDataService } from '../../covidDataService.service';
import { DistrictDataItem } from '../../types';
import { ListItemComponent } from '../../list-item/list-item.component';
import { NgFor } from '@angular/common';
import '@material/web/list/list';

@Component({
  selector: 'app-district-list',
  standalone: true,
  imports: [ListItemComponent, NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <md-list>
      <app-list-item
        (updateStateName)="onSelectDistrict(district.district)"
        *ngFor="let district of districts"
        [itemType]="'District:'"
        [stateName]="district.district"
        [confirmed]="district.confirmed"
        [recovered]="district.recovered"
        [deceased]="district.deceased"
      ></app-list-item>
    </md-list>
  `,
})
export class DistrictListComponent implements OnInit {
  districts: DistrictDataItem[] = [];
  constructor(
    private router: Router,
    private covidDataService: CovidDataService,
    private activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit() {
    if (this.activatedRoute.snapshot.params['state']) {
      const data = await this.covidDataService.getStateData(
        this.activatedRoute.snapshot.params['state'],
      );
      console.log(data);
      this.districts = data?.districtData ?? [];
      console.log(this.districts);
    }
  }

  onSelectDistrict(district: string): void {
    const state = this.activatedRoute.snapshot.params['state'];
    this.covidDataService.setSelectedDistrict(district);
    this.router.navigate(['/states', state, 'districts', district]);
  }
}
