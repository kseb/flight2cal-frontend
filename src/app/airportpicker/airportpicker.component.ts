import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClientService} from "../http-client.service";
import {map, Observable, startWith} from "rxjs";

export class Airport {
  constructor() {
    this.Icao = ''
    this.Name = ''
    this.City = ''
    this.Latitude = ''
    this.Longitude = ''
    return this
  }

  Icao: string
  Name: string
  City: string
  Latitude: string
  Longitude: string
}

@Component({
    selector: 'app-airportpicker',
    templateUrl: './airportpicker.component.html',
    styleUrls: ['./airportpicker.component.less'],
    standalone: false
})
export class AirportpickerComponent implements OnInit {
  airports: Airport[]
  filteredAirports: Observable<Airport[]>
  @Input() title: string = ''

  constructor(private service: HttpClientService) {
    this.airports = []
    this.filteredAirports = new Observable<Airport[]>()
    this.loadAirports()
  }

  private _filter(value: string): Airport[] {
    if (value.length < 3) {
      return []
    }
    const filterValue = value.toLowerCase();
    return this.airports.filter(option => option.Name.toLowerCase().includes(filterValue))
  }

  loadAirports() {
    let airportsJson = this.service.getHttpClient().get<Airport[]>(this.service.getBackendUrl() + "/airports/all");
    airportsJson.pipe(map(
      airports => airports.map(airport => Object.assign(new Airport(), {...airport})
      )
      )).subscribe(airports => this.airports = airports);

    /*airportsJson.subscribe((airports: Airport[]) => {
      this.airports = airports
    })*/
  }

  airport = new FormControl<Airport | null>(null)

  displayFn(airport: Airport | null): string {
    if (airport == null || !airport.Name) {
      return ''
    }
    return airport.Name + " (" + airport.City + ", " + airport.Icao + ")"
  }

  ngOnInit(): void {
    this.filteredAirports = this.airport.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (typeof value === 'string' && value.length >= 3) {
          return this._filter(value)
        } else {
          return []
        }
      })
    )
  }
}
