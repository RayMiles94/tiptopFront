import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./User";
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

const basePath = environment.basePath;
@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

  private baseUrl = '/api/users'; // Replace with your API URL
  private baseUrlStatistics = '/api/statistics'; // Replace with your API URL
  public users : User[] = [];

  public constructor(private http: HttpClient) { }

  public getAllUsers():  Observable<User[]> {
    return this.http.get<User[]>(`${basePath}/users`);
  }

  public SetUsers(users: User[]) {
    this.users = users;
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User[]>(`${basePath}/users/${id}`);
  }
  getSimpleUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${basePath}/users/simple`);
  }
  getPrizes(): Observable<any> {
    return this.http.get<User[]>(`${basePath}/statistics/prizes`);
  }
}
