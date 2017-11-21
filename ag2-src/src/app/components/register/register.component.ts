import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm, Validators} from '@angular/forms';
import {ValidateService} from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
name: string;
username: string;
email: string;
password: string;
agb: boolean;

  constructor(private ValidateService: ValidateService) { }

  ngOnInit() {
  }

  onFormSubmit(userForm: NgForm) {
      const user = {
        name: [this.name, Validators.required],
        username: this.username,
        email: this.email,
        password: this.password,
        agb: this.agb
      }
  //Required Fields
  if(!this.ValidateService.validateRegister(user)){
  console.log('Leere Felder');
  return false;
    }
  console.log(user);
  }
}
