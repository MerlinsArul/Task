import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private authService:AuthService){}


  isLoggedIn(): boolean {
    const token = this.authService.getToken();
    return !!token; 
  }

  logout(): void {
    this.authService.clearToken();
  }

}
