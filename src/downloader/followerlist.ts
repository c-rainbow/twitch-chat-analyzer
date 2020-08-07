import TwitchClient, { HelixFollow } from 'twitch';


export interface StreamerData {
    id: number;
    username: string;
    displayName: string;
    profilePicUrl: string;
}

export type LoopEventHandler = (downloaded: HelixFollow[]) => void;

export class FollowerListDownloader {
    // Twitch API client
    readonly client : TwitchClient;
    // Numeric ID (not username or display name) of streamer
    readonly streamerId : number;
    // Event handler for each paginated result from API call
    handler : LoopEventHandler;

    constructor(client: TwitchClient, streamerId: number, handler: LoopEventHandler) {
        this.client = client;
        this.streamerId = streamerId;
        this.handler = handler;
    }

    async download() {
        const filter = {followedUser: this.streamerId};
        const request = this.client.helix.users.getFollowsPaginated(filter);

        let follows : HelixFollow[] = null;
        do {
            follows = await request.getNext();
            if(follows !== null && follows.length) {
                this.handler?.(follows);
            }
        } while(follows !== null && follows.length);
    }
}
