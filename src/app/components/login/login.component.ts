import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername: string = '';
  loginPassword: string = '';

  constructor(private userService: UserService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.userService.login(this.loginUsername, this.loginPassword).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['']); 
        this.authService.login;
      },
      error => {
        
        console.error('Login failed:', error);
      }
    );
  }

}
