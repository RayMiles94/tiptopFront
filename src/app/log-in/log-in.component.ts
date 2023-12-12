import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Person} from '../admin-dashboard/person';
import {PersonService} from '../services/person.service';
import {SocialSignInService} from '../services/socialSignIn.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
   userProfile: any;

  loggedIn!: boolean;
  user! : Person;
  userForm: FormGroup;

  google: any;
  err: number=0;

  constructor(private _renderer2: Renderer2
              ,private authService: SocialAuthService
              , private ref: ChangeDetectorRef
              , private router: Router,
              private facebookService:SocialSignInService
  ,private pesonService: PersonService) {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')

    });
  }

  ngOnInit() {
//     this.authService.authState.subscribe((user) => {
//       this.pesonService.loginWithGoogle(user.idToken);
//     });
//
// //For button login
//     (globalThis as any).handleCredentialResponse = (response: any) => {
//       // Handle the response here
//       console.log('Received credential response:', response);
//       this.pesonService.loginWithGoogle(response.credential);
//      // window.location.href = 'https://localhost:4200/myAccount';
//     };
//     this.authService.authState.subscribe(
//       data => {
//         this.loggedIn = (data != null);
//       }
//     );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);      }
    );
  }
  onLoggedin()
  {
    this.pesonService.login(this.userForm.value).subscribe((data : any)=> {
      let jwToken = data.headers.get('Authorization');
      if (data.body.token){
        this.pesonService.saveToken(data.body.token);
        if (this.pesonService.isAdmin()){
          this.router.navigate(['/admin']);

        }else {
          this.router.navigate(['/myAccount']);
        }
      }
    },(err)=>{   this.err = 1;
    });

  }

}
