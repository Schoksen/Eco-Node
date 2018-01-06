import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  success: boolean;
  name: string;
  username: string;
  email: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
        console.log(profile);
        this.success = profile.success;
        this.name = profile.user.name;
        this.username = profile.user.username;
        this.email = profile.user.email;
      },
      err => {
        //this.router.navigate(['/']);
        console.log(err);
      });
  }

}
