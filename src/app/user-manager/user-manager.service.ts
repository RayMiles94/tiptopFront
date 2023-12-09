import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Users } from "./Users";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

  private baseUrl = 'http://localhost:8080/api/users'; // Replace with your API URL
  public users : Users[] = [];

  public constructor(private http: HttpClient) { }

  public getAllUsers():  Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}`);
  }

  public SetUsers(users: Users[]) {
    this.users = users;
  }

}
