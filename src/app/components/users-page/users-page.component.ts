import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationUser } from 'src/app/models/applicationUser';
import { SearchRequest } from 'src/app/models/searchRequest';
import { UsersSearchResponse } from 'src/app/models/usersSearchResponse';
import { UsersService } from 'src/app/services/users.service';
import { Paging } from 'src/app/models/paging';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent {
  private hasInitialized = false;
  public users: UsersSearchResponse = new UsersSearchResponse();
  public searchReq: SearchRequest = new SearchRequest();
  public paging: Paging = new Paging();
  displayedColumns: string[] = ['username', 'email'];
  dataSource = new MatTableDataSource<ApplicationUser>();
  originalDataSource = new MatTableDataSource<ApplicationUser>();
  totalItems = 0;
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersService: UsersService) {}

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => this.loadUsersPage());
    this.dataSource.sort = this.sort;  
    this.loadUsersPage();

  }

  loadUsersPage() {
    this.searchReq.page = this.paginator.pageIndex + 1;
    this.searchReq.pageSize = this.paginator.pageSize;

    this.usersService.search(this.searchReq).subscribe((data) => {
      this.dataSource.data = data.results;
      this.paginator.length = data.paging.totalRecords;
      if(!this.hasInitialized){
        this.originalDataSource.data = data.results;
        this.hasInitialized=true;
    }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
