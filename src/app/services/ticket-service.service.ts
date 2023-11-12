import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, Subscription, switchMap, tap, throwError} from 'rxjs';
import {Message, Ticket} from '../ticket/ticket';
import {PersonService} from './person.service';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  private baseUrl = 'http://localhost:8080/users'; // Replace with your API URL
  private userId!: number;

  constructor(private http: HttpClient,
              private userService: PersonService) { }

  public getTickets(): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.baseUrl}/getTickets`);
  }
  public getUserId(): Observable<any> {
    return this.userService.getUserIdByUsername().pipe(
      tap(e => {
        this.userId = e;
      })
    );
  }
  public getTicketByUserId(): Observable<any>{
    return this.getUserId().pipe(
      switchMap(() => {
        return this.http.get<any>(`${this.baseUrl}/getTicketByUserId/${this.userId}`);
      })
    );
  }

  public addTicket(tiketNumber: number): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/addTicket`,tiketNumber).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );;
  }

  public updateTicket(ticket: number, userId:number):Observable<any>{
    const url = `${this.baseUrl}/asignTicket/${userId}`; // Assuming userId is part of the URL
    return this.http.put<any>(url, ticket);  }

  public updateTicketStatus(ticketNumber: number){
    return this.http.put<any>(`${this.baseUrl}/updateTicket/${ticketNumber}`,null);
  }

}
