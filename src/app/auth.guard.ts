import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.decodeToken(token);
      const userRole = payload.role;
      if (userRole === 'ProjectArchitect') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    this.toastr.warning('Kindly Login as ProjectArchitect', 'Message');
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const payload = this.authService.decodeToken(token);
      const userRole = payload.role;
      if (userRole === 'PromptEngineer') {
        return true;
      }
    }
    this.router.navigate(['/login']);
    this.toastr.warning('Kindly Login as PromptEngineer', 'Message');
    return false;
  }
}
