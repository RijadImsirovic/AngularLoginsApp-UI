import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UsersPageComponent } from './components/users-page/users-page.component';
import { LoginsPageComponent } from './components/logins-page/logins-page.component';
import { AuthGuard } from './services/guard-auth.service'; // Import your guard
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/Register', pathMatch: 'full'},
  {path: 'Register', component: RegisterComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'Logins', component: LoginsPageComponent, canActivate: [AuthGuard]},
  {path: 'AddUser', component:AddUserComponent , canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
