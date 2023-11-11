import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  name: string = '';
  email: string = '';
  message: string = '';


  constructor(private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    emailjs.init('OyMYHcUHbVgPukiCa');
    emailjs.send('service_ada0mwe','template_h4ls039', {
      reply_to:this.email,
      to_name: this.name,
      lotcadeau: this.message
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

}
