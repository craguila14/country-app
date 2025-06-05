import { Component, inject, signal, linkedSignal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { rxResource } from "@angular/core/rxjs-interop"
import { of } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';
import {SearchStateService } from '../../services/search-state.service';
@Component({

    selector: 'by-country-page',
    imports: [SearchInputComponent, CountryListComponent],
    templateUrl: './by-country-page.component.html',
  })
export class ByCountryPageComponent {

      countryService = inject(CountryService)

      searchState = inject(SearchStateService)
    activatedRoute = inject(ActivatedRoute)

    router = inject(Router)

    query = this.searchState.countryQuery

      constructor() {
        const param = this.activatedRoute.snapshot.queryParamMap.get('query')
        if (param) {
            this.query.set(param)
        }
    }

      countryResource = rxResource({
        request: () => ({  query: this.query() }),
        loader: ({request}) => {

            if(!request.query) return of ([])

            this.router.navigate(['/country/by-country'], {
                queryParams: { query: request.query }
            } )

            return this.countryService.searchByCountry(request.query)
       
        }
    })


}