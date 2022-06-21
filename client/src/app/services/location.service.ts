import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Location} from "../interfaces/location.inteface"
import {Observable, ObservedValuesFromArray} from "rxjs";

@Injectable({
    providedIn: 'root'}
)
export class LocationService {

    constructor(private http: HttpClient) {

    }

    create(location: Location, imageSrc: string, city: string, temp: number, minTemp: number, maxTemp: number, description: string): Observable<Location> {
        console.log("createLocationMongo")
        // const fd = new FormData()

        const fd = {
            'lat': ""+location.lat,
            'lng': ""+location.lng,
            'src': ""+imageSrc,
            'city': city,
            'temp': temp,
            'minTemp': minTemp,
            'maxTemp': maxTemp,
            'description': description
        }

        return this.http.post<Location>('api/place', fd)

    }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>('api/place');
    }

}
