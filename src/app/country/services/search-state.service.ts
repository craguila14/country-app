import { Injectable, signal } from "@angular/core";
import { Region } from "../interfaces/region.interface";

@Injectable({
    providedIn: 'root'
})

export class SearchStateService {
    capitalQuery = signal<string>('');
    countryQuery = signal<string>('');
    regionQuery = signal<Region | null>('Africa');
}