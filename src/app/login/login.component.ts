import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router,private toastr:ToastrService) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token);

        const userRole = this.authService.getUserRole();
        if (userRole === 'admin') {
         this.toastr.success('Logged in as Admin','Message')
          this.router.navigate(['/addcategory']);
        } else if (userRole === 'user') {
          this.toastr.success('Logged in as User','Message')
          this.router.navigate(['/']);
        } else {
          alert('There is no role in this');
        }
      },
      (error) => {
        this.toastr.warning('Please login again with correct credentials','Message');
        console.log(error);
      }
    );
  }
}
