import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  acceptedCookies: boolean = false;
  constructor(private cookieService: CookieService) { }

  showCookiePopup: boolean = true;

  ngOnInit(): void {
    const cookieAccepted = this.cookieService.get('cookieAccepted');
    if (cookieAccepted && cookieAccepted === 'true') {
      this.acceptedCookies = true;
    }
  }
  acceptCookies() {
    // Logic for accepting cookies
    this.acceptedCookies = true;
    this.cookieService.set('cookieAccepted', 'true'); // Setting a cookie to remember user preference
  }

}
