import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername: string = '';
  loginPassword: string = '';
  users: User[] = []; // Assuming you have a User model


  constructor(private userService: UserService, private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  login(): void {
    this.userService.login(this.loginUsername, this.loginPassword).subscribe(
      response => {
      const { username, nom, prenom, lieu, position} = response;
      this.authService.login(username, nom, prenom, lieu, position);
      this.router.navigate(['']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log('All users:', this.users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

}
