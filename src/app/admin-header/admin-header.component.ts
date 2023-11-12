import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  @Input() userProfile: any; // Assuming userProfile is provided as input
  logedInuser!: any;

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {

  }
  handleSignOut() {
    this.personService.logout();
    this.router.navigate(['/home']);
  }

  async getLoginStatus() {

  }
}
