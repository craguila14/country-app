import { Component, inject, signal, linkedSignal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchStateService } from '../../services/search-state.service';

function validateQueryParam(queryParam: string): Region {

    queryParam = queryParam.toLowerCase()
    const validRegions: Record<string, Region> = {
        'africa': 'Africa',
        'americas': 'Americas',
        'asia': 'Asia',
        'Eeurope': 'Europe',
        'oceania': 'Oceania',
        'antarctic': 'Antarctic'
    }

    return validRegions[queryParam] ?? 'Americas'
}

@Component({
    selector: 'by-region-page',
    imports: [CountryListComponent],
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

    countryService = inject(CountryService)
    searchState = inject(SearchStateService)

     public regions: Region[] =  [
        'Africa',
        'Americas',
        'Asia',
        'Europe',
        'Oceania',
        'Antarctic'
     ]

    activatedRoute = inject(ActivatedRoute)

    router = inject(Router)   
    
    selectedRegion = this.searchState.regionQuery

        constructor() {
        const param = this.activatedRoute.snapshot.queryParamMap.get('region')
        if (param) {
            this.selectedRegion.set(validateQueryParam(param))
        }
    }

     
      countryResource = rxResource({
        request: () => ({  region: this.selectedRegion() }),
        loader: ({request}) => {

            if(!request.region) return of ([])

                this.router.navigate(['/country/by-region'], {
                queryParams: { region: request.region }
            } )
            return this.countryService.searchByRegion(request.region)
       
        }
    })
}