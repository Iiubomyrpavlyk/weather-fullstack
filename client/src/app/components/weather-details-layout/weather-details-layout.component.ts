import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {response} from "express";
import {PlaceService} from "../../services/place.service";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

import {Location} from "../../interfaces/location.inteface"
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'app-weather-details-layout',
    templateUrl: './weather-details-layout.component.html',
    styleUrls: ['./weather-details-layout.component.css']
})
export class WeatherDetailsLayoutComponent implements OnInit {

    city_name: string = this.weatherService.city

    constructor(public weatherService: WeatherService,
                private placeService: PlaceService,
                public authService: AuthService,
                private locationService: LocationService
    ) {
        this.weatherService.setUpDayliWeather(1)
        this.weatherService.setUpWeather(5)
    }

    ngOnInit(): void {
        // this.weatherService.setUpDayliWeather(1/)
    }

    getCityName() {
        return this.weatherService.city;
    }

    getCountry() {
        return this.weatherService.country;
    }

    getMinTemp() {
        return this.weatherService.minTemp;
    }

    getMaxTemp() {
        return this.weatherService.maxTemp;
    }

    wasClicked(day: number) {
        this.weatherService.setUpDayliWeather(day)
    }

    getHumidity() {
        return this.weatherService.humidity;
    }

    getFeelslike() {
        return this.weatherService.feelsLike;
    }

    getWind() {
        return this.weatherService.wind;
    }

    onLocationSave() {
        console.log("onLocationSave")
        const location: Location = {
            lat: this.weatherService.weatherResponse.lat,
            lng: this.weatherService.weatherResponse.lon
        }

        // let imageSrc: string
        this.weatherService.getImageURL(this.getCityName()).subscribe(
            response => {
                // console.log(response.results[0].urls.small)
                const imageSrc: string = response.results[1].urls.regular
                console.log("imagesrc = " + imageSrc)
                console.log("city name = " + this.getCityName())
                this.locationService.create(location, imageSrc, this.getCityName(), this.getFeelslike(), this.getMinTemp(), this.getMaxTemp(), this.getDescription()).subscribe((response) => {
                    console.log("success")
                }, error => console.log("error"))
            }, error => {
                console.log("an error occured while getting image from splash")
            }
        )

    }

    getAllLocations() {
        return this.locationService.getAll()
    }

    getSunRise(): number {
        return this.weatherService.dawn;
    }

    getSunset(): number {
        return this.weatherService.sunset;
    }

    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    convertMsToTime(milliseconds: number) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        seconds = seconds % 60;
        minutes = minutes % 60;

        // 👇️ If you don't want to roll hours over, e.g. 24 to 00
        // 👇️ comment (or remove) the line below
        // commenting next line gets you `24:00:00` instead of `00:00:00`
        // or `36:15:31` instead of `12:15:31`, etc.
        hours = hours % 24;

        return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
    }

    getIconURL(): string {
        console.log(this.weatherService.iconURL)
        return this.weatherService.iconURL;
    }

    getDescription(): string {
        return this.weatherService.description;
    }
}
