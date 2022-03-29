export class User {

    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpirationDay: Date
    ) {}


    get token()
    {
        if (!this._tokenExpirationDay || new Date()>this._tokenExpirationDay)
        {
            return null;
        }
        
        return this._token;
    }

}