import {SocialAuthService} from '@abacritt/angularx-social-login';
import {ChangeDetectorRef, Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Person} from '../admin-dashboard/person';
import {PersonService} from '../services/person.service';
import {SocialSignInService} from '../services/socialSignIn.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  @Input() userProfile!: any; // Assuming userProfile is provided as input
  logedInuser: boolean=false;

  public constructor(private router: Router,
                     private authService: SocialAuthService,
                     private facebookService:SocialSignInService,
                     private cdr: ChangeDetectorRef,
                     public personService:PersonService) {
  }

  ngOnInit() {
  }

  handleSignOut() {
    this.logedInuser= false;

    this.personService.logout();
    this.signOut();

  }
  signOut(): void {
    this.authService.signOut();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userProfile']) {
      // Perform actions when userProfile changes
      console.log('userProfile has changed:', this['userProfile']);
      if (this['userProfile']){
        this.logedInuser= true;
        this.userProfile= this['userProfile'];
      }

      // Add any other actions you want to perform here
    }
  }


}
