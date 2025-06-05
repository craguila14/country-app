import { Component, inject, linkedSignal } from "@angular/core";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from "../../services/country.service";
import { Country } from "../../interfaces/country.interface";
import { firstValueFrom, of } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop"
import { ActivatedRoute, Router } from "@angular/router";
import { SearchStateService } from "../../services/search-state.service";

@Component({
    selector: "by-capital-page",
    imports: [CountryListComponent, SearchInputComponent ],
    templateUrl: "./by-capital-page.component.html",
})

export class ByCapitalPageComponent {

    countryService = inject(CountryService)
    searchState = inject(SearchStateService)
    activatedRoute = inject(ActivatedRoute)

    router = inject(Router)

    query = this.searchState.capitalQuery

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

            this.router.navigate(['/country/by-capital'], {
                queryParams: { query: request.query }
            } )

            return this.countryService.searchByCapital(request.query)
       
        }
    })


    // countryResource = resource({
    //     request: () => ({  query: this.query() }),
    //     loader: async({request}) => {
    //         if(!request.query) return []

    //         return await firstValueFrom(
    //             this.countryService.searchByCapital(request.query)
    //         )
           
    //     }
    // })



}
