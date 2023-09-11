import { Logins } from "./logins";
import { Paging } from "./paging";

export class LoginsSearchResponse {
    results: Logins[] = [];
    paging: Paging = new Paging();
}