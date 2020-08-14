
const defaultClientId = "59x8jyaudw3pnyi722x3e2x9awh385";

const defaultKrakenHeaders = {
    "Client-ID": "",
    "Accept": "application/vnd.twitchtv.v5+json",
}


export class ConfigManager {
    static userClientId : string;

    static setUserClientId(clientId: string) {
        this.userClientId = clientId;
    }

    static getClientId() : string {
        if(this.userClientId) {
            return this.userClientId;
        }
        return defaultClientId;
    }

    static getDefaultKrakenHeaders() {
        return {
            "Client-ID": this.getClientId(),
            "Accept": "application/vnd.twitchtv.v5+json",
        }
    }
}