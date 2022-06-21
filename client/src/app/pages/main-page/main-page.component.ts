import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PlaceService} from "../../services/place.service";
import {WeatherService} from "../../services/weather.service";

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    constructor(public auth: AuthService, public weatherService: WeatherService) {
    }

    ngOnInit(): void {
    }

}
