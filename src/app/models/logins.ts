export class Logins{
    id: number = 0;
    userId: string = "";
    isSuccessful: boolean = true;
    //loginAttemptAt: string = "";
    loginAttemptAt: Date | null = null;
    user: {
        id: string;
        username: string;
        email: string;
    } = {
        id: "",
        username: "",
        email: ""
    };
}