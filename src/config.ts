

const defaultClientId = "59x8jyaudw3pnyi722x3e2x9awh385";



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
}