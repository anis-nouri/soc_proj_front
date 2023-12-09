import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Renderer2 } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flip', [
      state('normal', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(-180deg)' })),
      transition('normal => flipped', animate('700ms ease-out')),
      transition('flipped => normal', animate('700ms ease-in')),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  flipState = 'normal';
  loginUsername: string = '';
  loginPassword: string = '';
  registrationForm: FormGroup;
  tunisiaGovernorates: string[] = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte', 'Beja', 'Jendouba', 'Kef', 'Siliana',
    'Sousse', 'Monastir', 'Mahdia', 'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabes', 'Medenine', 'Tataouine',
  ];


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private authservice : AuthService, private renderer: Renderer2) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      lieu: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  login(): void {
    this.userService.login(this.loginUsername, this.loginPassword).subscribe(
      response => {
      const { username, nom, prenom, lieu, position} = response;
      this.authservice.login(username, nom, prenom, lieu, position);
      this.router.navigate(['']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  createUser(): void {
    console.log('Create user method called');
  console.log('Form values:', this.registrationForm.value);
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value;
      this.userService.createUser(user).subscribe(
        response => {
          this.flipOtherObject();
          },
        error => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  flipOtherObject() {
    this.flipState = this.flipState === 'normal' ? 'flipped' : 'normal';
  }

}