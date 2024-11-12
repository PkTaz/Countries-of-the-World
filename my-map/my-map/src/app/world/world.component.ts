import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../api.service'; // Adjust the path if necessary
import { Observable } from 'rxjs';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {}

  loadCountryData(svgCountry: SVGPathElement): void {
    // Call the API service to get country data
    this.apiService.getCountryData(svgCountry.id).subscribe(data => {
      let dataPath: any = data[1];

      // Data from API call
      let name: string = dataPath[0].name;
      document.getElementById('name')!.innerText = name;

      let capital: string = dataPath[0].capitalCity;
      document.getElementById('capital')!.innerText = capital;

      let region: string = dataPath[0].region.value;
      document.getElementById('region')!.innerText = region;

      let income: string = dataPath[0].incomeLevel.value;
      document.getElementById('income')!.innerText = income;

      let longitude: string = dataPath[0].longitude;
      document.getElementById('longitude')!.innerText = longitude;

      let latitude: string = dataPath[0].latitude;
      document.getElementById('latitude')!.innerText = latitude;

      // Fetch life expectancy
      this.apiService.getLifeExpectancy(svgCountry.id).subscribe(lifeExpectancyData => {
        let lifeExpectancyPath: any = lifeExpectancyData[1];
        let lifeExpectancy: number = lifeExpectancyPath[0]?.value; // Optional chaining
        document.getElementById('life-expectancy')!.innerText = lifeExpectancy ? lifeExpectancy.toString() : 'Data not available';
      });

      // Fetch GDP
      this.apiService.getGDP(svgCountry.id).subscribe(gdpData => {
        let gdpPath: any = gdpData[1];
        let gdp: number = gdpPath[0]?.value; // Optional chaining
        document.getElementById('gdp')!.innerText = gdp ? gdp.toString() : 'Data not available';
      });
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      let svgCountryPaths = document.querySelectorAll<SVGPathElement>('path');

      Array.prototype.forEach.call(svgCountryPaths, (svgCountry: SVGPathElement) => {
        svgCountry.addEventListener('click', () => {
          this.loadCountryData(svgCountry);
        });

        svgCountry.addEventListener('mouseover', (event: MouseEvent) => {
          const path = event.target as SVGPathElement; // Change color on hover
          path.style.fill = '#FFA500';
        });

        svgCountry.addEventListener('mouseleave', (event: MouseEvent) => {
          const path = event.target as SVGPathElement; // Revert color on leave
          path.style.fill = '';
        });
      });
    }
  }
}


