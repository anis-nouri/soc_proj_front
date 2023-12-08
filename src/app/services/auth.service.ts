import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, nom: string, prenom: string, lieu: string, position: string) {
    this.isAuthenticated = true;

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('lieu', lieu);
    localStorage.setItem('position', position);
  }


  logout() {
    this.isAuthenticated = false;

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('lieu');
    localStorage.removeItem('position');
  } 

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getLocation(): string | null {
    // Get the stored location from LocalStorage
    return localStorage.getItem('location');
  }

}