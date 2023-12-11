import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Message } from '../ticket/ticket';
import {Ticket} from "../user-manager/User";
import {PersonService} from "./person.service";

@Injectable({
  providedIn: 'root'
})
export class LegacyTicketService {

  private baseUrl = '15.237.223.123:8080/api/tickets'; // Replace with your API URL
  private statsUrl = '15.237.223.123:8080/api/statistics'; // Replace with your API URL
  private userId!: number;

  constructor(private http: HttpClient,
    private userService: PersonService) { }

  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/getTickets`);
  }

  public getUserId(): Observable<any> {
    return this.userService.getUserIdByUsername().pipe(
      tap(e => {
        this.userId = e;
      })
    );
  }
  public getTicketByUserId(): Observable<any> {
    return this.getUserId().pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.baseUrl}/getTicketByUserId/${this.userId}`);
      })
    );
  }


  public getTicketByUserIds(id : number): Observable<any> {
    return this.getUserId().pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.baseUrl}/getTicketByUserId/${id}`);
      })
    );
  }
  public addTicket(tiketNumber: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/addTicket`, tiketNumber).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  public checkTicket(ticket: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}/checkTicket/${ticket}`; // Assuming userId is part of the URL
    return this.http.post<any>(url, ticket);
  }

  public updateTicketStatus(ticketNumber: number) {
    return this.http.put<any>(`${this.baseUrl}/updateTicket/${ticketNumber}`, null);
  }

  public getTicketsByPrize(prize: string) {
    return this.http.get<any>(`${this.statsUrl}/${prize}`);
  }



}
