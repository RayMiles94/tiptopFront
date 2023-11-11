import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Chart} from 'chart.js';
import {Person} from '../admin-dashboard/person';
import {TicketServiceService} from '../services/ticket-service.service';
import { Giveaway } from './giveaway';

@Component({
  selector: 'app-giveaway',
  templateUrl: './giveaway.component.html',
  styleUrls: ['./giveaway.component.css']
})
export class GivewayComponent implements OnInit , AfterViewInit{

  displayedColumns: string[] = ['nom', 'description', 'dateDebut', 'dateFin', 'ticketsMax'];
  dataSource!: Person[];
  dataChart: any[]=[];



  constructor(private router:Router,
              private ticketService: TicketServiceService,
  ) { }

  ngOnInit(): void {
    this.getTicketList();
  }
  onSubmit() {
    // Implement submission logic here
    console.log('Form submitted:');
  }

  onDelete() {
    // Implement deletion logic here
    console.log('Delete button clicked');
  }

  openGiveaway(giveaway:any) {
    
  }

  addWinnerTicket() {
    this.router.navigate(["/addTicket"]);

  }

  viewAdminDash() {
    this.router.navigate(["/admin/giveaway"]);
  }

  viewWinner() {
    this.router.navigate(["/winner"]);
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.RenderChart();
    },500)
  }

  public getTicketList(){
    this.ticketService.getTickets().subscribe(ticket => {
      const reclamedPersonsCount = ticket.filter(person => person.status === 'reclame').length;
      this.dataChart.push(reclamedPersonsCount);
      const notReclamedPersonsCount = ticket.filter(person => person.status === 'nonreclame').length;
      this.dataChart.push(notReclamedPersonsCount);
    })
  }

  RenderChart(){
    const myChart= new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ['lot collectés', 'lot non collectés'],
        datasets: [{
          label: 'Chart des personnes qui ont collectées leurs cadeaux',
          data: {...this.dataChart},
          borderWidth: 1,
          backgroundColor:['rgba(53, 11, 11, 0.76)','rgba(182, 189, 186, 0.5098)']

        }]
      },
    });
  }
}
