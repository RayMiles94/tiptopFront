import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {PersonService} from './services/person.service';
import {SocialSignInService} from './services/socialSignIn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tiptop';
  loggedInuser: boolean= false;
  userProfile: any;
  userType: any;
  role!: string;
  loggedInuserFB:any;
  private loginStatus: any;
  public constructor(private router: Router,
                     private facebookService:SocialSignInService,
                     private cdr: ChangeDetectorRef,
                     public personService: PersonService) {
  }

   ngOnInit() {
     this.personService.loadToken();
     if (this.personService.getToken()==null ||
       this.personService.isTokenExpired())
       this.router.navigate(['/logIn']);

    // this.authService.authState.subscribe(user => {
    //   console.log(user)
    //   if (user) {
    //     this.userProfile = user;
    //     this.loggedInuserFB = this.userProfile != null;
    //   }
    // });
    //
     // if(this.loggedInuser == this.getLoginStatus()){
     //   this.userProfile= {firstName:"Eya"};
     //
     // }

     this.cdr.detectChanges();
  }

  // handleSignOut() {
  //   this.authService.signOut().then(r => {
  //     console.log(r);
  //
  //     sessionStorage.removeItem("loggedInUser");
  //     this.router.navigate(["/home"]).then(() => {
  //       window.location.reload();
  //     });
  //   });
  //   console.log(sessionStorage);
  // }
  //
  // async getLoginStatus() {
  //
  // }
  //
  onConnexion() {
    window.location.href="https://localhost:4200/logIn";
  }
  // onLogout(){
  //   this.personService.logout();
  // }
}
