import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Message } from '../ticket/ticket';
import {Ticket} from "../user-manager/User";
import {PersonService} from "./person.service";
import { environment } from '../../environments/environment';
const basePath = environment.basePath;
@Injectable({
  providedIn: 'root'
})
export class LegacyTicketService {

  private baseUrl = '/api/tickets'; // Replace with your API URL
  private statsUrl = '/api/statistics'; // Replace with your API URL
  private userId!: number;

  constructor(private http: HttpClient,
    private userService: PersonService) { }

  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${basePath}/tickets/getTickets`);
  }

  public getUserId(): Observable<any> {
    return this.userService.getUserIdByUsername().pipe(
      tap(e => {
        this.userId = (e as unknown as number);
      })
    );
  }
  public getTicketByUserId(): Observable<any> {
    return this.getUserId().pipe(
      switchMap(() => {
        return this.http.get<any>(`${basePath}/tickets/getTicketByUserId/${this.userId}`);
      })
    );
  }


  public getTicketByUserIds(id : number): Observable<any> {
    return this.getUserId().pipe(
      switchMap(() => {
        return this.http.get<any>(`${basePath}/tickets/getTicketByUserId/${id}`);
      })
    );
  }
  public addTicket(tiketNumber: number): Observable<any> {
    return this.http.post<any>(`${basePath}/tickets/addTicket`, tiketNumber).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public checkTicket(ticket: number, userId: number): Observable<any> {
    const url = `${basePath}/tickets/checkTicket/${ticket}`; // Assuming userId is part of the URL
    return this.http.post<any>(url, ticket);
  }

  public updateTicketStatus(ticketNumber: number) {
    return this.http.put<any>(`${basePath}/tickets/updateTicket/${ticketNumber}`, null);
  }

  public getTicketsByPrize(prize: string) {
    return this.http.get<any>(`${basePath}/statistics/${prize}`);
  }



}
