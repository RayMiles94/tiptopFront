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

  }
  onLoggedin()
  {
    this.pesonService.login(this.userForm.value).subscribe((data)=> {
      let jwToken = data.headers.get('Authorization');
      if (jwToken){
        this.pesonService.saveToken(jwToken);
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
