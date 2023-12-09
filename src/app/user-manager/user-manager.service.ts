import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsermanagerService {

  private baseUrl = 'http://localhost:8080/api/users'; // Replace with your API URL
  public users : User[] = [];

  public constructor(private http: HttpClient) { }

  public getAllUsers():  Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public SetUsers(users: User[]) {
    this.users = users;
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User[]>(`${this.baseUrl}/${id}`);
  }
}
