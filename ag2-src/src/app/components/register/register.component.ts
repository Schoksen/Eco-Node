import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      agb: this.agb
    }
    console.log(user);

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('Registration successful');
        this.router.navigate(['login'], );
      } else {
        console.log('Registration unsuccessful');
        this.router.navigate(['/register'], );
      }
    });
  }


}
