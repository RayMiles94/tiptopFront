import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PersonService} from '../services/person.service';
import {SocialSignInService} from '../services/socialSignIn.service';
import { LegacyTicketService } from '../services/ticket-service';
import { Ticket } from './ticket';
import {TicketManagementService} from "../ticket-management/ticket-management-service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user-manager/User";
import {Prize} from "../admin-dashboard/person";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TicketComponent implements OnInit {
  public tickets: Ticket[] = [];
  public userId: number = 0;
  public message: string = '';
  userProfile: any;

  public prize : Prize;
  private ticketCount : number;
  constructor(private ticketService: LegacyTicketService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private fb: SocialSignInService,
              private personService: PersonService,
              private ticketManagementService : TicketManagementService) { }
  public form = this.formBuilder.group({
    ticketNumber: new FormControl('',[Validators.minLength(10), Validators.maxLength(10) , Validators.pattern("^[0-9]*$"),
    ], ),
  })
  ngOnInit(): void {
   this.getTickets();
   console.log('ticket',this.userProfile)
    this.personService.getUserIdByUsername().subscribe(userId => {
      this.userId= userId;
    })
  }

//   this.ticketManagementService.getTicketsCount().subscribe((data: any) => {
//   console.log("prize ", data)
//   this.prize = data;
// });
//

  public getTickets(){
    this.ticketService.getTicketByUserId().subscribe((data: Ticket[])=>{
      return this.tickets = data;
    })
  }

  public validateTicket(){
    const ticketNumberValue = this.form.value.ticketNumber;
    console.log(ticketNumberValue);

    this.ticketService.updateTicket(Number(this.form.value.ticketNumber),this.userId).subscribe(message => {
    console.log('test',message) ;
    if (message !== null){
      this.snackBar.open('votre ticket est ajouté avec succés', 'close', {
        duration: 5000, // 3 seconds
        verticalPosition: 'bottom', // Adjust the vertical position
        horizontalPosition: 'center', // Adjust the horizontal position
        panelClass: ['error-snackbar'], // CSS class for success message styling
      });
    }
    else {
      this.snackBar.open('Ce ticket est déjà utilisé', 'close', {
        duration: 5000, // 3 seconds
        verticalPosition: 'bottom', // Adjust the vertical position
        horizontalPosition: 'center', // Adjust the horizontal position
        panelClass: ['error-snackbar'], // CSS class for success message styling
      });
    }
    })


  }

  utiliserUnTicket() {
    this.ticketManagementService.utiliserTicket().subscribe((data: any) => {
      console.log("prize ", data)
      this.prize = data;
    });
  }
}
