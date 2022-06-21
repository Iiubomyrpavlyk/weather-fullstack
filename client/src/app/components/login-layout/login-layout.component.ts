import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Subscriber, Subscription, throwIfEmpty } from 'rxjs';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login-layout',
    templateUrl: './login-layout.component.html',
    styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit, OnDestroy {

    form: FormGroup | any;
    aSub: Subscription | any;

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })

        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                console.log("You are logged!")
            } else if (params['accessDenied']) {
                console.log("You need to be autorized!")
            }
        })
    }

    onSubmit() {
        const user: User = {
            name: "",
            email: this.form.value.email,
            password: this.form.value.password
        }

        this.aSub = this.auth.login(user)
            .subscribe(
                () => {
                    console.log("Login success!")
                    this.router.navigate(['/'])
                },
                error => {
                    console.log("login failed!")
                    this.form.enable()
                }
                )
    }

    ngOnDestroy(): void {
        if (this.aSub) {
            this.aSub.unsubscribe()
        }
    }
}
