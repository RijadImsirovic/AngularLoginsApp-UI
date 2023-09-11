import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SearchRequest } from '../models/searchRequest';
import { UsersSearchResponse } from '../models/usersSearchResponse';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private applicationUserUrl = 'ApplicationUser';

  constructor(private http: HttpClient) {}

  public search(req: SearchRequest): Observable<UsersSearchResponse> {
    return this.http.get<UsersSearchResponse>(
      `${environment.apiUrl}/${this.applicationUserUrl}/search?query=${req.query.toString()}
                                                              &page=${req.page}
                                                              &pageSize=${req.pageSize}
                                                              &sortColumn=${req.sortColumn}
                                                              &sortOrder=${req.sortOrder}`
    );
  }
}
