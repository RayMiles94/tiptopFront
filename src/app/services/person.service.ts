import { HttpClient, HttpParams } from '@angular/common/http';
import { incrementalFromCompilerTicket } from '@angular/compiler-cli/src/ngtsc/core';
import {Injectable, InjectionToken} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { Person } from '../admin-dashboard/person';
import { environment } from '../../environments/environment';
const basePath = environment.basePath;
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // private baseUrl = '/users';

  token!: string;
  public loggedUser!: string;
  public username!: string;
  public isloggedIn!: Boolean;
  public roles!: string;
  private helper = new JwtHelperService();


  constructor(private router: Router,
    private http: HttpClient) { }


  login(user: Person) {
    return this.http.post<Person>(`${basePath}/users/login`, user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    console.log('decoded', decodedToken);
    if (decodedToken.role) {
      this.roles = decodedToken.role;
      this.loggedUser = decodedToken.sub;
    } else {
      this.roles = 'USER'
      this.loggedUser = decodedToken.email;
      this.username = decodedToken.name;
    }

  }

  getToken(): string {
    return this.token;
  }

  isAdmin(): Boolean {
    return this.roles == 'ADMIN';
  }

  logout() {
    this.loggedUser = '';
    this.roles = '';
    this.token = '';
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/home']);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  loadToken() {
    const tokenFromLocalStorage = localStorage.getItem('jwt');
    if (tokenFromLocalStorage !== null) {
      this.token = tokenFromLocalStorage; // Type assertion to assert that the value is a string
      this.isloggedIn = true;
      this.decodeJWT();
    }
  }

  public addUser(user: any): Observable<Person> {
    return this.http.post<any>(basePath + '/add', user);
  }
  public getPersons(): Observable<any> {
    return this.http.get<any>(`${basePath}/tickets/getAllTickets`,{ observe: 'response' });
  }

  public setPrize(person: any): Observable<any> {
    return this.http.put<any>(`${basePath}/users/setPrize`, person,{ observe: 'response' });
  }

  getWinner(): Observable<any> {
    return this.http.get<any>(`${basePath}/users/getYearWinner`,{ observe: 'response' });
  }

  getUserIdByUsername() {
    const params = (this.loggedUser).toString();
    console.log(params);
    return this.http.get<number>(`${basePath}/users/getUserId/${params}`,{ observe: 'response' });
  }

  loginWithGoogle(token: any): any {
    this.saveToken(token);
    let user = {
      email: this.loggedUser,
      username: this.username,
      password: ''
    }
    this.addUser(user).subscribe(user => {
      console.log(user);
      this.router.navigate(['/myAccount']);
    });
    return;
  }


}
