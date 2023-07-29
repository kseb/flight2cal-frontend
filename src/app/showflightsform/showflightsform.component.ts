import {Component, Input} from '@angular/core';
import {Airport, AirportpickerComponent} from "../airportpicker/airportpicker.component";
import {HttpClientService} from "../http-client.service";
import {getLocaleTimeFormat} from "@angular/common";
import * as ics from 'ics';
import {GeoCoordinates} from "ics";


export class Flights {

  constructor(flights: Flight[]) {
    this.flights = flights;
  }

  flights: Flight[]
}

export class Flight {

  constructor(arr_icao: string, dep_icao: string, flight_icao: string, departure: string, arrival: string, departure_airport_name: string, arrival_airport_name: string) {
    this.arr_icao = arr_icao;
    this.dep_icao = dep_icao;
    this.flight_icao = flight_icao;
    this.departure = departure;
    this.arrival = arrival;
    this.departure_airport_name = departure_airport_name;
    this.arrival_airport_name = arrival_airport_name;
  }

  arr_icao: string
  dep_icao: string
  flight_icao: string
  departure: string
  arrival: string
  departure_airport_name: string
  arrival_airport_name: string
}

@Component({
  selector: 'app-showflightsform',
  templateUrl: './showflightsform.component.html',
  styleUrls: ['./showflightsform.component.less'],
})
export class ShowflightsformComponent {
  flights: Flight[] = []

  constructor(private service: HttpClientService) {
  }

  submit(date: string, departure: Airport | null, arrival: Airport | null) {
    if ((<Airport>departure).Icao === undefined || (<Airport>arrival).Icao === undefined) {
      alert("Please choose a departure and arrival airport.")
    } else {
      let flightsJson = this.service.getHttpClient().get<Flights>(this.service.getBackendUrl() + "/" + (<Airport>arrival).Icao + "/" + (<Airport>departure).Icao + "/" + date);
      //flightsJson.subscribe()
      flightsJson.subscribe((flights: Flights) => {
        this.flights = flights.flights
      })
    }
  }

  downloadIcs(flight: Flight, departureAirport: AirportpickerComponent, arrivalAirport: AirportpickerComponent) {
    const startDate = new Date(flight.departure);
    const endDate = new Date(flight.arrival);
    let geo: GeoCoordinates | undefined;
    if (departureAirport.airport.value?.Latitude && departureAirport.airport.value?.Longitude) {
      if (departureAirport.airport.value instanceof Airport) {
        geo = {lat: parseFloat(departureAirport.airport.value.Latitude), lon: parseFloat(departureAirport.airport.value.Longitude)}
      }
    } else {
      geo = undefined
    }
    const icalEvent = ics.createEvent({
      start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), startDate.getHours(), startDate.getMinutes()],
      end: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate(), endDate.getHours(), endDate.getMinutes()],
      title: 'Flight from ' + departureAirport.airport.value?.City + ' to ' + arrivalAirport.airport.value?.City,
      description: "ICAO: " + flight.flight_icao,
      location: flight.departure_airport_name,
      geo: geo,
    });
    if (icalEvent.value) {
      let fileName = "flight-" + startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate() + ".ics";
      const icsFile = new File([icalEvent.value], fileName, {type: 'text/calendar'});
      window.open(window.URL.createObjectURL(icsFile));
    }
  }

  protected readonly getLocaleTimeFormat = getLocaleTimeFormat;
}
