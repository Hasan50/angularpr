export class Appuser {
    token: string;
    userName: string;
    id: string;
    public constructor(theToken: string, theUserName:string, theId:string) 
    { 
        this.token = theToken; 
        this.userName = theUserName; 
        this.id = theId;
    }
}
