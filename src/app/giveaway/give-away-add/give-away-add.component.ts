import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LegacyTicketService} from '../../services/ticket-service';
import {Ticket} from '../../ticket/ticket';
import {Giveaway} from '../giveaway';

@Component({
  selector: 'app-give-away-add',
  templateUrl: './give-away-add.component.html',
  styleUrls: ['./give-away-add.component.css']
})
export class GiveAwayAddComponent implements OnInit {
  public message: string = '';
  public tickets: Ticket[] = [];

  constructor(private ticketService: LegacyTicketService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getTickets();
  }
  public form = this.formBuilder.group({
    ticketNumber: new FormControl('',[Validators.minLength(10), Validators.maxLength(10) , Validators.pattern("^[0-9]*$"),
    ], ),
  })
  onSubmit() {
    // Implement submission logic here
    console.log('Form submitted:', );
  }

  addTicket() {
    this.ticketService.addTicket(Number(this.form.value.ticketNumber)).subscribe(message => {
      console.log(message) ;
    }, error => {
      if(error.error.text){
        this.message = (error.error.text);
        this.snackBar.open(this.message, 'close', {
          duration: 5000, // 3 seconds
          verticalPosition: 'bottom', // Adjust the vertical position
          horizontalPosition: 'center', // Adjust the horizontal position
          panelClass: ['error-snackbar'], // CSS class for success message styling
        });
      }
      else {

        this.message = (error.error);
        this.snackBar.open(this.message, 'close', {
          duration: 5000, // 3 seconds
          verticalPosition: 'bottom', // Adjust the vertical position
          horizontalPosition: 'center', // Adjust the horizontal position
          panelClass: ['error-snackbar'], // CSS class for success message styling
        });
      }
    });
    window.location.reload();
  }

  public getTickets(){
    // this.ticketService.getTickets().subscribe((data: Ticket[])=>{
    //   return this.tickets = data;
    // })
  }

  goBack(): void {
    window.history.back();
  }
}
