import {Component, Input, OnInit} from '@angular/core';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() userProfile: any; // Assuming userProfile is provided as input
  logedInuser!: any;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {

  }
  handleSignOut() {
    this.personService.logout();
    window.location.href='https://localhost:4200/home';
  }

  async getLoginStatus() {

  }
}
