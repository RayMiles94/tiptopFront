import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';
import {Person} from '../../admin-dashboard/person';
import {PersonService} from '../../services/person.service';
import {LegacyTicketService} from '../../services/ticket-service';

@Component({
  selector: 'app-give-away-edit',
  templateUrl: './give-away-edit.component.html',
  styleUrls: ['./give-away-edit.component.css']
})
export class GiveAwayEditComponent implements OnInit {
  dataSource!: Person[];
  displayedColumns: string[] = ['username', 'email', 'status',  'prize','actions'];
  disabled!: boolean;

  constructor(private userService: PersonService,
              private snackBar: MatSnackBar,
              private ticketService: LegacyTicketService) { }

  ngOnInit(): void {
    this.dataSource;
    this.disabled = false;
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

  goBack(): void {
    window.history.back();
  }

  close() {
      this.userService.getWinner().subscribe(person=>{
        this.dataSource.push(person);
        this.disabled=true;
      })
  }
}
