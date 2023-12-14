import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
import {Message, TicketCreateRequest} from '../ticket/ticket';
import {Ticket} from "../user-manager/User";
import {Prize} from "../admin-dashboard/person";
import {environment} from "../../environments/environment";

const basePath = environment.basePath;
@Injectable({
  providedIn: 'root'
})
export class TicketManagementService {

  private baseUrl = '/api/tickets'; // Replace with your API URL
  private userId!: number;

  constructor(private http: HttpClient) { }


  public getMytickets():  Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${basePath}/tickets/me`);
  }
  public getUserTickets(id : number):  Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${basePath}/tickets/${id}`);
  }



  public addTicketToUser(ticketcreateRequest : TicketCreateRequest):  Observable<Ticket[]> {
    return this.http.post<Ticket[]>(`${basePath}/tickets`,ticketcreateRequest);
  }


  public utiliserTicket():  Observable<Prize>{
    return this.http.post<Prize>(`${basePath}/tickets`,null);
  }

    public getTicketsCount(): Observable<Prize> {
    return this.http.get<Prize>(`${basePath}/tickets`);
  }

  spinWheel(ticketNumberValue : number) {
    return this.http.post<Prize>(`${basePath}/tickets/play/${ticketNumberValue}`,null);
  }
}
