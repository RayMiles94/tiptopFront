import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;

  constructor(private personService:PersonService) {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addUser() {
    console.log(this.userForm.value);
    this.personService.addUser(this.userForm.value).subscribe(e=> {
      console.log(e);
    });
    window.location.reload()
  }
}
