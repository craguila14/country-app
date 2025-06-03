import { Component, input } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Country } from '../../interfaces/country.interface';
@Component({
    selector: 'by-region-page',
    imports: [CountryListComponent],
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
     countries = input.required<Country[]>()
}