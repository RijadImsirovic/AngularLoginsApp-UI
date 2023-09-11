import { Component } from '@angular/core';
import { Register } from '../../models/register';
import { Login } from '../../models/login';
import { JwtAuth } from '../../models/jwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto = new Login();
  jwtAuth = new JwtAuth();
  hide = true;

  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  loginPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/),
  ]);

  constructor(private authService: AuthenticationService, private router: Router) {}

  Login(loginDto: Login) {
    loginDto.email = this.loginEmail.value || '';
    loginDto.password = this.loginPassword.value || '';

    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
      this.router.navigate(['/Users']).then(() => {
        window.location.reload();
      });
    });
  }

}
