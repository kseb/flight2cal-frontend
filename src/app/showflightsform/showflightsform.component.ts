import {Component} from '@angular/core';
import {Airport} from "../airportpicker/airportpicker.component";
import {HttpClientService} from "../http-client.service";
import {getLocaleTimeFormat} from "@angular/common";
import 'add-to-calendar-button';

export class Flights {

  constructor(flights: Flight[]) {
    this.flights = flights;
  }

  flights: Flight[]
}

export class Flight {

  constructor(arr_icao: string, dep_icao: string, flight_icao: string, departure: string, arrival: string, departure_airport_name: string,
              arrival_airport_name: string, airline_name: string, arrival_city: string, departure_city: string) {
    this.arr_icao = arr_icao;
    this.dep_icao = dep_icao;
    this.flight_icao = flight_icao;
    this.departure = departure;
    this.arrival = arrival;
    this.departure_airport_name = departure_airport_name;
    this.arrival_airport_name = arrival_airport_name;
    this.airline_name = airline_name;
    this.arrival_city = arrival_city;
    this.departure_city = departure_city;
  }

  arr_icao: string
  dep_icao: string
  flight_icao: string
  departure: string
  arrival: string
  departure_airport_name: string
  arrival_airport_name: string
  airline_name: string
  arrival_city: string
  departure_city: string
}

@Component({
  selector: 'app-showflightsform',
  templateUrl: './showflightsform.component.html',
  styleUrls: ['./showflightsform.component.less'],
  standalone: false
})
export class ShowflightsformComponent {
  flights: Flight[] = []

  constructor(private service: HttpClientService) {
  }

  submit(date: string, departure: Airport | null, arrival: Airport | null) {
    if ((<Airport>departure).Icao === undefined || (<Airport>arrival).Icao === undefined) {
      alert("Please choose a departure and arrival airport.")
    } else {
      let flightsJson = this.service.getHttpClient().get<Flights>(this.service.getBackendUrl() + "/flights/" + (<Airport>arrival).Icao + "/" + (<Airport>departure).Icao + "/" + date);
      flightsJson.subscribe((flights: Flights) => {
        this.flights = flights.flights
      })
    }
  }

  protected readonly getLocaleTimeFormat = getLocaleTimeFormat;
}
