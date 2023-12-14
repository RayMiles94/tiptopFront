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


  public getMytickets():  Observable<any> {
    return this.http.get<any>(`${basePath}/tickets/me`,{ observe: 'response' });
  }
  public getUserTickets(id : number):  Observable<any> {
    return this.http.get<any>(`${basePath}/tickets/${id}`,{ observe: 'response' });
  }



  public addTicketToUser(ticketcreateRequest : TicketCreateRequest):  Observable<any> {
    return this.http.post<any>(`${basePath}/tickets`,ticketcreateRequest,{ observe: 'response' });
  }


  public utiliserTicket():  Observable<any>{
    return this.http.post<any>(`${basePath}/tickets`,null,{ observe: 'response' });
  }

    public getTicketsCount(): Observable<any> {
      return this.http.get<any>(`${basePath}/tickets`,{ observe: 'response' });
  }

  spinWheel(ticketNumberValue : number) {
    return this.http.post<any>(`${basePath}/tickets/play/${ticketNumberValue}`,null,{ observe: 'response' });
  }
}
