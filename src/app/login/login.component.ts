import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  login(): void {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token);

        const userRole = this.authService.getUserRole();
        if (userRole === 'ProjectArchitect') {
          this.toastr.success('Logged in as ProjectArchitect', 'Message');
          this.router.navigate(['/addcategory']);
        } else if (userRole === 'PromptEngineer') {
          this.toastr.success('Logged in as PromptEngineer', 'Message');
          this.router.navigate(['/user']);
        } else {
          this.toastr.warning('There is no role in this', 'Message');
        }
      },
      (error) => {
        this.toastr.warning(
          'Please login again with correct credentials',
          'Message'
        );
        console.log(error);
      }
    );
  }
}
  // login(): void {
  //   this.authService.login(this.email, this.password).subscribe(
  //     (response) => {
  //       const token = response.token;
  //       this.authService.setToken(token);

  //       const userRole = this.authService.getUserRole();
  //       if (userRole === 'admin') {
  //        this.toastr.success('Logged in as Admin','Message')
  //         this.router.navigate(['/addcategory']);
  //       } else if (userRole === 'user') {
  //         this.toastr.success('Logged in as User','Message')
  //         this.router.navigate(['/']);
  //       } else {
  //         alert('There is no role in this');
  //       }
  //     },
  //     (error) => {
  //       this.toastr.warning('Please login again with correct credentials','Message');
  //       console.log(error);
  //     }
  //   );
  // }

