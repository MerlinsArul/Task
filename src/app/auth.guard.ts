import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.decodeToken(token);
      const userRole = payload.role;
      if (userRole === 'admin') {
        return true;
      }
    }
    this.router.navigate(['/login']);
   this.toastr.warning('Kindly Login','Message')
    return false;
  }
}
