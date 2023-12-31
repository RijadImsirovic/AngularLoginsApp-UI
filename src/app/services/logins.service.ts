import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LoginsSearchRequest } from '../models/loginsSearchRequest';
import { LoginsSearchResponse } from '../models/loginsSearchResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginsService {
  private logins = 'Logins';

  constructor(private http: HttpClient) {}

  public search(req: LoginsSearchRequest): Observable<LoginsSearchResponse> {
    return this.http.get<LoginsSearchResponse>(
      `${environment.apiUrl}/${this.logins}/search?query=${req.query.toString()}
                                                              &page=${req.page}
                                                              &pageSize=${req.pageSize}
                                                              &sortColumn=${req.sortColumn}
                                                              &sortOrder=${req.sortOrder}`
    );
  }
}
