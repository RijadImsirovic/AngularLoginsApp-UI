import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ZenturyLoginsApp-UI';
  isAuthenticated: boolean = true;
  
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    const jwtToken = localStorage.getItem('jwtToken');
    this.isAuthenticated = !!jwtToken;
  }
}
