import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Logins } from 'src/app/models/logins';
import { LoginsSearchRequest } from 'src/app/models/loginsSearchRequest';
import { LoginsService } from 'src/app/services/logins.service';
import { Paging } from 'src/app/models/paging';
import {MatSort} from '@angular/material/sort';
import { LoginsSearchResponse } from 'src/app/models/loginsSearchResponse';

@Component({
  selector: 'app-logins-page',
  templateUrl: './logins-page.component.html',
  styleUrls: ['./logins-page.component.css']
})
export class LoginsPageComponent {

  private hasInitialized = false;
  public logins: LoginsSearchResponse = new LoginsSearchResponse();
  
  public searchReq: LoginsSearchRequest = new LoginsSearchRequest();
  public paging: Paging = new Paging();
  displayedColumns: string[] = ['username', 'email', 'loginAttemptAt'];
  dataSource = new MatTableDataSource<Logins>();
  originalDataSource = new MatTableDataSource<Logins>();
  totalItems = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private loginsService: LoginsService) {}

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadLoginsPage());
    this.dataSource.sort = this.sort;  
    this.loadLoginsPage();
  }
  
  loadLoginsPage() {
    this.searchReq.page = this.paginator.pageIndex + 1;
    this.searchReq.pageSize = this.paginator.pageSize;

    this.loginsService.search(this.searchReq).subscribe((data) => {
      this.dataSource.data = data.results;
      this.paginator.length = data.paging.totalRecords;
      if(!this.hasInitialized){
        this.originalDataSource.data = data.results;
        this.hasInitialized=true;
    }
    });
  }

   applyFilter(filterValue: string) {
      this.dataSource.filterPredicate = (data: Logins, filterValue: string) => {
        return data.user.username.toLowerCase().includes(filterValue.toLowerCase());
      };

     filterValue = filterValue.trim().toLowerCase();
     this.dataSource.filter = filterValue;
   }

}
