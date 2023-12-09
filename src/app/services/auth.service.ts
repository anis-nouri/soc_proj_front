import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  login(username: string, nom: string, prenom: string, lieu: string, position: string) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('lieu', lieu);
    localStorage.setItem('position', position);
  }


  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('lieu');
    localStorage.removeItem('position');
  } 

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  getLocation(): string | null {
    return localStorage.getItem('location');
  }

}