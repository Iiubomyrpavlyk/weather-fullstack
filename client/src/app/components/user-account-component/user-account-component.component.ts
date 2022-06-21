import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from "../../services/auth.service";
import {LocationService} from "../../services/location.service";

import {Location} from "../../interfaces/location.inteface"
import {UserlocationService} from "../../services/userlocation.service";
import {WeatherService} from "../../services/weather.service";

@Component({
    selector: 'app-user-account-component',
    templateUrl: './user-account-component.component.html',
    styleUrls: ['./user-account-component.component.css']
})
export class UserAccountComponentComponent implements OnInit {

    user: User | any

    locations: LocationResponse[] = []

    constructor(public auth: AuthService, private locationService: LocationService, public userLocationService: UserlocationService, private weatherService: WeatherService) {
        this.locationService.getAll()
            .subscribe(async response => {
                    console.log(response)
                    // this.locations = response
                    for (let loc of response) {
                        const tempLoc: LocationResponse = {
                            lat: loc.lat,
                            lng: loc.lng,
                            imageSrc: loc.imageSrc,
                            date: loc.date,
                            city: loc.city,
                            temp: loc.temp,
                            description: loc.description,
                            minTemp: loc.minTemp,
                            maxTemp: loc.maxTemp
                        }
                        this.userLocationService.location = tempLoc
                        // await this.userLocationService.setUpWeather()
                        this.locations.push(tempLoc)
                    }
                    // console.log(this.locations)
                    // for (let loc of this.locations) {
                    //     this.userLocationService.location = {lat: loc.lat, lng: loc.lng}
                    //     await this.userLocationService.getWeatherDetails(loc.lat, loc.lng)
                    //     console.log(this.userLocationService.city as string)
                    // }
                },
                error => console.log("There is an error in getAllLocation"))

    }

    ngOnInit(): void {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.auth.getToken());

        this.user = {
            name: decodedToken.name,
            email: decodedToken.email,
        }


    }

    onLocationClicked(index: number) {
        console.log("was clicked " + index)
        const location: Location = {
            lat: this.locations[index].lat,
            lng: this.locations[index].lng,
        }
        this.weatherService.setLocation(location)
        this.weatherService.setUpWeather(5)
    }

}

interface LocationResponse {
    lat: number,
    lng: number,
    imageSrc: string,
    date: Date,
    city: string,
    temp: number,
    minTemp: number,
    maxTemp: number,
    description: string
}
