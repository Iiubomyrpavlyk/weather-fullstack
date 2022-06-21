import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: string | any = null

    constructor(private http: HttpClient) {

    }

    register(user: User): Observable<User> {
        return this.http.post<User>('/api/auth/register', user)
    }

    login(user: User): Observable<{ token: string }> {
        console.log(user);

        return this.http.post<{ token: string }>('/api/auth/login', user)
            .pipe(
                tap(({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.setToken(token)
                })
            )
    }

    setToken(token: string | any) {
        this.token = token
    }

    getToken(): string {
        return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout() {
        console.log(this.token)
        this.setToken(null)
        localStorage.clear()
        console.log(this.token)
    }

}
