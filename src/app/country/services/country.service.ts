import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";
import { map, Observable, catchError, throwError, delay, of, tap } from "rxjs";
import type { Country } from "../interfaces/country.interface";
import { CountryMapper } from "../mappers/country.mapper";
import { Region } from "../interfaces/region.interface";

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
    providedIn: 'root',
})

export class CountryService {
    private http = inject(HttpClient)

    private queryCacheCapital = new Map<string, Country[]>()
    
    private queryCacheCountry = new Map<string, Country[]>()
    
    private queryCacheRegion = new Map<Region, Country[]>()

    searchByCapital(query: string): Observable<Country[]> {
        query = query.toLowerCase()

        if(this.queryCacheCapital.has(query)){
            return of (this.queryCacheCapital.get(query) ?? [])
        }

        return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
            .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap(countries => this.queryCacheCapital.set(query, countries)),
                catchError(error => {
                    console.log(error)
                    return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
                })
            )
    }

    searchByCountry(query: string) {
        query = query.toLowerCase()

        if(this.queryCacheCountry.has(query)){
            return of (this.queryCacheCountry.get(query) ?? [])
        }
          
        console.log(this.queryCacheCountry)

        return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
            .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap(countries => this.queryCacheCountry.set(query, countries)),
                catchError(error => {
                    console.log(error)
                    return throwError(() => new Error(`No se pudo obtener paises con ese query ${query}`))
                })
            )
    }

    searchByRegion(region: Region) {

        if(this.queryCacheRegion.has(region)){
            return of (this.queryCacheRegion.get(region) ?? [])
        }
        
        return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
            .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap(countries => this.queryCacheRegion.set(region, countries)),
                catchError(error => {
                    console.log(error)
                    return throwError(() => new Error(`No se pudo obtener paises con ese query ${region}`))
                })
            )
    }

       searchCountryByAlphaCode(code: string) {

        return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
            .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                map(countries => countries.at(0)),
                catchError(error => {
                    console.log(error)
                    return throwError(() => new Error(`No se pudo obtener paises con ese código ${code}`))
                })
            )
    }
}