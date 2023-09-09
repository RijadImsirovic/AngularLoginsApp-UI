import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginsService {
  private url = 'Logins';

  constructor(private http: HttpClient) {}
}
