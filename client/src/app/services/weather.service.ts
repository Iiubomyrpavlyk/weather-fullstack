import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Address} from "ngx-google-places-autocomplete/objects/address";

import {Location} from "../interfaces/location.inteface";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    public city?: string | any
    public country?: string | any

    public humidity: number | any
    public wind: number | any
    public feelsLike: number | any

    public dawn: string | any
    public sunset: string | any

    public minTemp: string | any
    public maxTemp: string | any

    private address: Address | any
    private location: Location | any

    public iconURL: string | any
    public description: string | any

    public weatherResponse: any

    // private readonly API_KEY = "7d503b91872c5eb56c07e48aa3d3d80b"
    private readonly API_KEY = "dde14c3e0df945f0b4906e8d3a0e78be"

    constructor(private http: HttpClient) {

    }

    setLocation(location: Location) {
        this.location = location
    }

    setAddress(address: Address) {
        this.address = address;
    }

    getAddress() {
        return this.address;
    }

    getWeatherDetails(days: number): Observable<any> {
        return this.http.get<any>(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${this.location.lat}&lon=${this.location.lng}&key=${this.API_KEY}`);
    }

    getLocation() {
        return this.location;
    }

    getIconUrl(url: string) {
        return `https://www.weatherbit.io/static/img/icons/${url}.png`;
    }

    setUpWeather(days: number) {
        this.getWeatherDetails(days).subscribe(response => {
                this.weatherResponse = response
                this.city = response.city_name
                const arrWether = this.address.formatted_address.split(", ")
                this.country = arrWether[arrWether.length - 2]
                console.log(this.weatherResponse)
                console.log(this.address)
            },
            error => console.log(error))
    }

    setUpDayliWeather(day: number) {
        this.minTemp = +this.weatherResponse.data[day].min_temp
        this.maxTemp = +this.weatherResponse.data[day].max_temp
        this.wind = +this.weatherResponse.data[day].wind_spd
        this.feelsLike = +this.weatherResponse.data[day].temp
        this.humidity = +this.weatherResponse.data[day].rh
        this.dawn = +this.weatherResponse.data[day].sunrise_ts
        this.sunset = +this.weatherResponse.data[day].sunset_ts
        console.log(this.weatherResponse.data[day].weather)
        this.iconURL = `https://www.weatherbit.io/static/img/icons/${this.weatherResponse.data[day].weather.icon}.png`
        this.description = this.weatherResponse.data[day].weather.description
        console.log(this.weatherResponse.data[day].weather.description)
    }

    getTempByDay(day: number) {
        return Math.round(+this.weatherResponse.data[day].temp)
    }

    getWeatherIconByDay(day: number) {
        return `https://www.weatherbit.io/static/img/icons/${this.weatherResponse.data[day].weather.icon}.png`;
    }

    getImageURL(city: string): Observable<any> {
        return this.http.get<any>(`https://api.unsplash.com/search/photos?query=${city}&client_id=yMzCwEkhUIdE0JhS8n17ffefq3rhy1-737yyA17dFjU`);
    }


}
