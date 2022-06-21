import {Component, OnInit} from '@angular/core';
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {AuthService} from "../../services/auth.service";
import {PlaceService} from "../../services/place.service";
import {WeatherService} from "../../services/weather.service";
import {response} from "express";

@Component({
    selector: 'app-header-layout',
    templateUrl: './header-layout.component.html',
    styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {

    isApiLoaded = false;
    options: any = {
        types: ['country', 'locality']
    }

    private location: Location | any

    constructor(
        // private mapsAPILoader: MapsAPILoader
        public auth: AuthService,
        private placeService: PlaceService,
        private weatherService: WeatherService
    ) {
    }

    ngOnInit() {
        // this.mapsAPILoader.load().then(() =>{
        //     this.isApiLoaded = true
        // })
    }

    handleAddressChange(address: Address) {
        this.location = {
            lat: address.geometry.location.lat(),
            lng: address.geometry.location.lng(),
        }

        this.weatherService.setLocation(this.location)
        this.weatherService.setAddress(address)

        this.weatherService.setUpWeather(5)
        this.weatherService.setUpDayliWeather(1)
    }

    onLogout() {
        this.auth.logout()
    }

    getPlaces(event: any) {
        // console.log(event.target.value)
        // this.placeService.getPlaces(event.target.value)
        //     .subscribe(response => console.log(response), error => console.log("error message places"))
    }

}

// https://maps.googleapis.com/maps/api/place/autocomplete/json?input=TEXT_INPUT_VALUE&types=(cities)&key=YOUR_API_KEY
// http://localhost:4200/api.openweathermap.org/data/2.5/forecast/daily?lat=49&lon=24&cnt=1&appid=7d503b91872c5eb56c07e48aa3d3d80b
