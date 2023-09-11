import { ApplicationUser } from "./applicationUser";
import { Paging } from "./paging";

export class UsersSearchResponse {
    results: ApplicationUser[] = [];
    paging: Paging = new Paging();
}