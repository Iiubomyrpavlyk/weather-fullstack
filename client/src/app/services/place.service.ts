import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class PlaceService {

    constructor(private http: HttpClient) {
    }

    getPlaces(inputValue: string): Observable<any> {
        const headers = new Headers();

        return this.http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${inputValue}&types=(cities)&key=AIzaSyCi_x__kZkT5kPM7HL7LlEjBSsiuNUyZLo`,)
    }

}
