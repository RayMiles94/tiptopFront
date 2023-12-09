import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Ticket, User} from "../user-manager/User";
import {MatPaginator} from "@angular/material/paginator";
import {LegacyTicketService} from "../services/ticket-service";
import {TicketManagementService} from "./ticket-management-service";
import {ActivatedRoute} from "@angular/router";
import {TicketCreateRequest} from "../ticket/ticket";

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {


  displayedColumns: string[] = ['ticketNumber', 'isUsed','userName','userEmail'];
  dataSource = new MatTableDataSource<Ticket>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  userId : number;
  constructor(private ticketService : TicketManagementService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketService.getMytickets().subscribe((data: any) => {
      console.log({data})
      this.dataSource = new MatTableDataSource<Ticket>(data);
      console.log('datasource', this.dataSource);
    });

    this.route.params.subscribe(params => {
      // Access the parameter by its name
      this.userId = params['id'];

      // Do something with the parameter
      console.log('Parameter from URL:', this.userId);
    });
  }


  addTicketToUser() {
    const ticketRequest: TicketCreateRequest = {
      userId: this.userId // Replace with the actual user ID you want to use
    };
    console.log("user id ",this.userId);
    this.ticketService.addTicketToUser(ticketRequest).subscribe();

  }
}
