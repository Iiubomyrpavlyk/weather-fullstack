import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Location} from "../interfaces/location.inteface";
import {response} from "express";

@Injectable({
    providedIn: 'root'
})
export class UserlocationService {

    location: Location | any
    private readonly API_KEY = "6988b69a385a409aa95232212222006"

    public minTemp: string | any
    public maxTemp: string | any
    public city: string | any
    public feelsLike: number | any
    public weatherResponse: any
    public description: string | any

    constructor(private http: HttpClient) {
    }

    async getWeatherDetails(lat: number, lng: number) {
        return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.API_KEY}`).subscribe(response => {
            this.city = "t " + response.city_name as string
            this.minTemp = response.data[0].min_temp
            this.maxTemp = response.data[0].max_temp
            this.feelsLike = response.data[0].temp
            this.description = response.data[0].weather.description
            console.log(response)
        }, error => console.log(error));
    }

    getCity(): string {
        console.log(this.city)
        return this.city
    }

    // setUpWeather() {
    //     this.getWeatherDetails(this.location.lat, this.location.lng).subscribe(response => {
    //             this.weatherResponse = response
    //             this.city = response.city_name
    //             this.minTemp = ++this.weatherResponse.data[0].min_temp
    //             this.maxTemp = ++this.weatherResponse.data[0].max_temp
    //             this.feelsLike = ++this.weatherResponse.data[0].temp
    //             console.log("USERLOCATIONSERVICE = " + this.weatherResponse)
    //         },
    //         error => console.log(error)
    //     )
    // }

    // getCity(lat: nuber, lng: number) {
    //     return this.city
    // }

}
