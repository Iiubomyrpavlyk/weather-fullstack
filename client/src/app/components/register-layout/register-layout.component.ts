import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-register-layout',
    templateUrl: './register-layout.component.html',
    styleUrls: ['./register-layout.component.css']
})
export class RegisterLayoutComponent implements OnInit, OnDestroy {

    form: FormGroup | any;
    aSap: Subscription | any;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnDestroy(): void {
        if (this.aSap) {
            this.aSap.unsubscribe()
        }
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    onSubmit() {
        this.form.disable
        const user: User = {
            name: this.form.value.name,
            email: this.form.value.email,
            password: this.form.value.password
        }
        this.aSap = this.auth.register(user)
            .subscribe(() => {
                    this.router.navigate(['/auth/login'], {
                        queryParams:  {
                            registered: true
                        }
                    })
                },
                error => {
                    console.log(error)
                    this.form.enable()
                })
    }
}
