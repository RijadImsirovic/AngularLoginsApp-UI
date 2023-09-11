import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, of, finalize } from "rxjs";
import { Paging } from "src/app/models/paging";
import { LoginsSearchRequest} from "src/app/models/loginsSearchRequest"
import { LoginsSearchResponse } from "src/app/models/loginsSearchResponse"
import { LoginsService } from "src/app/services/logins.service";

export class LoginsDataSource implements DataSource<LoginsSearchResponse> {
    private loginsSubject = new BehaviorSubject<LoginsSearchResponse[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private loginsService: LoginsService){}

    connect(collectionViewer: CollectionViewer): Observable<LoginsSearchResponse[]> {
        return this.loginsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.loginsSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(req: LoginsSearchRequest) {
        let paging: Paging = new Paging();
        this.loadingSubject.next(true);

        this.loginsService.search(req).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(users => {          
            if (Array.isArray(users)) {
                this.loginsSubject.next(users);
            } else {
                this.loginsSubject.next([users]);
            }
        });
    }    
}
