import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PersonService } from '../services/person.service';
import { Router } from '@angular/router';


interface DataForm {
  username: string | null;
  password: string | null;
  conpassword: string | null;
  email: string | null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  userForm: FormGroup;
  disable: boolean = false;
  error: boolean = false;

  constructor(private personService: PersonService, private router : Router) {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      conpassword: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.disable = false;
  }

  addUser() {
    let data : DataForm | any = this.userForm.value;
    if(data) {
      if (data.password.length !== data.conpassword.length) {
        this.error = true;
        return;
      }
      if (data.password !== data.conpassword) {
        this.error = true;
        return;
      }
      this.personService.addUser(this.userForm.value).subscribe(e => {
        if (e) {
          this.userForm.disable()
          this.disable = true;
          this.error = false;
          setTimeout(()=> {
            this.router.navigate(['/logIn']);
          } , 2000);
        }
      });
    }


  }
}
