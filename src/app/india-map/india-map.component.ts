import { Component } from '@angular/core';
import * as d3 from 'd3';
import { CovidDataService } from '../covidDataService.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-india-map',
  templateUrl: './india-map.component.html',
  styleUrls: ['./india-map.component.css'],
  standalone: true,
})
export class IndiaMapComponent {
  private width = window.innerWidth;
  private height = 500;
  private svg: any;
  private path: any;
  private g: any;
  private states: any;
  private districts: any;
  private zoom: any;
  private allowZoom = true;

  constructor(
    private covidDataService: CovidDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.drawMap();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.allowZoom) {
        const state = this.covidDataService.selectedState;
        const district = this.covidDataService.selectedDistrict;

        if (state && district) {
          this.zoomToDistrict(district);
        }

        if (state && !district) {
          this.zoomToState(state);
        }

        if (!state && !district) {
          this.reset();
        }
      }
    });
  }

  drawMap(): void {
    this.zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.zoomed.bind(this));

    this.svg = d3
      .select('#map-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('style', 'max-width: 100%; height: auto;')
      .on('click', () => this.reset());

    const projection = d3
      .geoMercator()
      .center([78.9629, 13.9037])
      .scale(620)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath().projection(projection);

    this.g = this.svg.append('g');

    d3.json('india_state.geojson')
      .then((data: any) => {
        this.states = this.g
          .append('g')
          .attr('fill', '#50606e')
          .attr('cursor', 'pointer')
          .selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .on('click', (event: any, d: any) => this.clicked(event, d))
          .attr('d', this.path);

        this.states.append('title').text((d: any) => d.properties.name);

        d3.json('india_district.geojson').then((districtData: any) => {
          this.districts = this.g
            .append('g')
            .attr('cursor', 'pointer')
            .selectAll('path')
            .data(districtData.features)
            .enter()
            .append('path')
            .on('click', (event: any, d: any) => this.clicked(event, d))
            .attr('class', 'district')
            .attr('d', this.path)
            .attr('fill', '#001E30')
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.1)
            .attr('display', 'none');

          this.states.on('click', (event: any, d: any) => {
            const stateName = d.properties.NAME_1;
            this.clicked(event, d);
            this.showDistricts(stateName);
          });
        });

        this.g
          .append('path')
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-linejoin', 'round')
          .attr('d', this.path);

        this.svg.call(this.zoom);
      })
      .catch((error) => {
        console.error('Error loading the GeoJSON data:', error);
      });
  }

  reset(): void {
    this.states.transition().style('fill', null);
    this.districts.attr('display', 'none');
    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity,
        d3
          .zoomTransform(this.svg.node())
          .invert([this.width / 2, this.height / 2]),
      );
  }

  clicked(event: any, d: any): void {
    const [[x0, y0], [x1, y1]] = this.path.bounds(d);
    event.stopPropagation();
    this.states.transition().style('fill', null);
    d3.select(event.target).transition().style('fill', '#001E30');
    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3.zoomIdentity
          .translate(this.width / 2, this.height / 2)
          .scale(
            Math.min(
              5,
              0.4 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height),
            ),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, this.svg.node()),
      )
      .on('end', () => {
        this.allowZoom = false;
        if (d.properties.NAME_1 && !d.properties.NAME_2) {
          this.router.navigate(['/states', d.properties.NAME_1]);
        }
        if (d.properties.NAME_2) {
          this.router.navigate([
            '/states',
            d.properties.NAME_1,
            'districts',
            d.properties.NAME_2,
          ]);
        }
        setTimeout(() => {
          this.allowZoom = true;
        }, 200);
      });
  }

  zoomed(event: any): void {
    const { transform } = event;
    this.g.attr('transform', transform);
    this.g.selectAll('.district').attr('stroke-width', 1 / transform.k);
  }

  private zoomToState(stateName: string): void {
    const stateElement = this.states
      .filter((d: any) => stateName.includes(d.properties.NAME_1))
      .node();
    if (stateElement) stateElement.dispatchEvent(new Event('click'));
  }

  private zoomToDistrict(districtName: string): void {
    console.log(districtName);
    const districtElement = this.districts
      .filter((d: any) => districtName.includes(d.properties.NAME_2))
      .node();

    if (districtElement) districtElement.dispatchEvent(new Event('click'));
  }

  private showDistricts(stateName: string): void {
    this.districts.attr('display', (d: any) =>
      stateName.includes(d.properties.NAME_1) ? 'block' : 'none',
    );
  }
}
