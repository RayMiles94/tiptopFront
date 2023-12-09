import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
import {Message, TicketCreateRequest} from '../ticket/ticket';
import {Ticket} from "../user-manager/User";

@Injectable({
  providedIn: 'root'
})
export class TicketManagementService {

  private baseUrl = 'http://localhost:8080/api/tickets'; // Replace with your API URL
  private userId!: number;

  constructor(private http: HttpClient) { }


  public getMytickets():  Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/me`);
  }
  public getUserTickets(id : number):  Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/${id}`);
  }



  public addTicketToUser(ticketcreateRequest : TicketCreateRequest):  Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${this.baseUrl}`,ticketcreateRequest);
  }

}
