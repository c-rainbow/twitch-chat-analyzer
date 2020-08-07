// File with config values and constants

export const clientId = "ybum1fvursno4nf3ckzx56jmhqynjk";  // Add client ID here

export const defaultHeaders = {
    "Client-ID": clientId,
    "Accept": "application/vnd.twitchtv.v5+json",
    "Authorization": "OAuth gcu9pd0kcn6x2x3drix6esbhlrfqfv",
}

// TypeScript does not allow parametrized string to be formatted in runtime,
// so this is the best way to get a formatted URL.
export function getApiUrl(videoId: string, nextCursor: string) : string {
    if(nextCursor) {
        return `https://api.twitch.tv/v5/videos/${videoId}/comments?cursor=${nextCursor}`;
    }
    return `https://api.twitch.tv/v5/videos/${videoId}/comments`;
}