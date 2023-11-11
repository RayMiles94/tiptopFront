import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {tick} from '@angular/core/testing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NavigationEnd, Router} from '@angular/router';
import {Chart, registerables, Tick} from 'chart.js';
import {PersonService} from '../services/person.service';
import {TicketServiceService} from '../services/ticket-service.service';
import {Person} from './person';
import { filter } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
Chart.register(...registerables);

declare var gtag: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  dataSource!: any;
  data:any[]=[];
  displayedColumns: string[] = ['username', 'email', 'status',  'prize','actions'];

  bigWinner!: Person;
  constructor(private personService: PersonService,
              router: Router,
              private snackBar: MatSnackBar,
              private ticketService: TicketServiceService,
              private cdr: ChangeDetectorRef) {
    // const navEndEvent$ = router.events.pipe(
    //   filter(e => e instanceof NavigationEnd)
    // );
    // // @ts-ignore
    // navEndEvent$.subscribe((e: NavigationEnd) => {
    //   gtag('config', 'G-8PTDTXD216', {'page_path':e.urlAfterRedirects});
    // });

  }

  ngOnInit(): void {
    this.getPersonsList();
  }

  public getPersonsList(){
    this.personService.getPersons().subscribe(persons => {
      console.log(persons);
      for (let i=0; i< persons.length;i++){
        this.data.push(persons[i])
        console.log('yest',this.data)

      }
     this.dataSource= this.data;
     // this.dataSource.forEach((user : Person) => {
     //   user.tickets.map(ticket => {
     //     user.ticketNumber= ticket.ticketNumber;
     //     user.status = ticket.status;
     //   })
     //
     // })
      console.log(this.dataSource);
    })
  }



  sendMail(person:any) {
    emailjs.init('OyMYHcUHbVgPukiCa');
    emailjs.send('service_ada0mwe','template_h4ls039', {
      reply_to:person.email,
      to_name: person.username,
      lotcadeau: person.prize
    })
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.snackBar.open('le mail a été envoyé', 'close', {
          duration: 5000, // 3 seconds
          verticalPosition: 'bottom', // Adjust the vertical position
          horizontalPosition: 'center', // Adjust the horizontal position
          panelClass: ['error-snackbar'], // CSS class for success message styling
        });

      }, (err) => {
        console.log('FAILED...', err);
      });
  }

  claimPrize(person:any) {
    console.log('person',person.ticketNumber);
    this.ticketService.updateTicketStatus(person.ticketNumber).subscribe(ticket=>{
      console.log('retour',ticket);
      this.getPersonsList();
      window.location.reload()
    });
  }
  goBack(): void {
    window.history.back();
  }
}
