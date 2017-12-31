import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  name: string;
  userName: string;
  email: string;
  password: string;
  agb: boolean;

  ngOnInit() {

  }

  onSubmit() {
    const user = {
      name: this.name,
      userName: this.userName,
      email: this.email,
      password: this.password,
      agb: this.agb
    }
    console.log(user);
  }
}
