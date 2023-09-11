import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, of, finalize } from "rxjs";
import { Paging } from "src/app/models/paging";
import { SearchRequest } from "src/app/models/searchRequest";
import { UsersSearchResponse } from "src/app/models/usersSearchResponse";
import { UsersService } from "src/app/services/users.service";

export class UsersDataSource implements DataSource<UsersSearchResponse> {

    private usersSubject = new BehaviorSubject<UsersSearchResponse[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private usersService: UsersService) {}

    connect(collectionViewer: CollectionViewer): Observable<UsersSearchResponse[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(req: SearchRequest) {
        let paging: Paging = new Paging();
        this.loadingSubject.next(true);

        this.usersService.search(req).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(users => {          
            if (Array.isArray(users)) {
                this.usersSubject.next(users);
            } else {
                this.usersSubject.next([users]);
            }
        });
    }    
}
