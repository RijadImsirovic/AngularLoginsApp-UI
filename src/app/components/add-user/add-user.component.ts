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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  registerDto = new Register();
  jwtAuth = new JwtAuth();
  hide = true;

  username = new FormControl('', [Validators.required, Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    // Validators.pattern('^(?=.*[A-Z])(?=.*d).{6,}$'),
  ]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private authService: AuthenticationService, private router: Router) {}

  Register(registerDto: Register) {
    registerDto.username = this.username.value || '';
    registerDto.email = this.email.value || '';
    registerDto.password = this.password.value || '';

    this.authService.register(registerDto).subscribe();
    this.router.navigate(['/Users']);
  }

}
