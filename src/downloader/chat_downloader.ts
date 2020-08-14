import { ConfigManager } from "../config";


const tooManyRequests = 429;  // HTTP 429 too many requests response code

async function sleep(ms: number) : Promise<any> {
    return new Promise(() => setTimeout(() => {}, ms));
}


export interface FetchResponse {
    status: number;
    text: string;
}


export type LoopEventHandler = (
    done: boolean,
    errorMsg: string,
    httpStatus: number,
    commentsData: any[],
) => void;


// TypeScript does not allow parametrized string to be formatted in runtime,
// so this is the best way to get a formatted URL.
function getApiUrl(videoId: string, nextCursor: string) : string {
    if(nextCursor) {
        return `https://api.twitch.tv/v5/videos/${videoId}/comments?cursor=${nextCursor}`;
    }
    return `https://api.twitch.tv/v5/videos/${videoId}/comments`;
}


export class ChatDownloader {
    loopHandler: LoopEventHandler;

    constructor(handler: LoopEventHandler) {
        this.loopHandler = handler;
    }

    // Download chat of single Twitch video
    async downloadChat(videoId: string) {
        let nextCursor : string = null;
        const headers = ConfigManager.getDefaultKrakenHeaders();
        do {
            const response = await this.callApi(headers, videoId, nextCursor);
            if(response.text) {  // response.text is null if status is not ok.
                try {
                    const jsonContent = JSON.parse(response.text);
                    const comments = jsonContent["comments"] || [];
                    nextCursor = jsonContent["_next"];
                    const done = !!nextCursor;
                    this.loopHandler(done, null, response.status, comments);
                }
                catch(err) {
                    console.error(`Error when parsing JSON response: ${response.text}`);
                    this.loopHandler(true, "JSON parsing error", response.status, []);
                }
            }
            else if(response.status == tooManyRequests) {
                this.loopHandler(false, "429 Too Many Request", response.status, []);
                // As of 2020-07-25, Kraken API does not seem to use 429 response code at all.
                // This sleep is here only as an additional check
                await sleep(500);  // Sleep for 1 second
            }
            else {
                console.error(`API call failed with error code: ${response.status}`);
                console.error(`response JSON: ${JSON.stringify(response)}`);
                this.loopHandler(true, "API call failure", response.status, []);
            }
        } while(nextCursor);
    }

    // Call Twitch API one time
    private async callApi(headers: any, videoId: string, cursor: string) : Promise<FetchResponse> {
        const url = getApiUrl(videoId, cursor);
        const response = await fetch(url, {headers: headers});
        if(!response.ok) {
            return {status: response.status, text: null};
        }
        const content = await response.text();
        return {status: response.status, text: content};
    }
}
