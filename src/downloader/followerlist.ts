import TwitchClient, { HelixFollow } from 'twitch';


export interface StreamerData {
    id: number;
    username: string;
    displayName: string;
    profilePicUrl: string;
}

export type LoopEventHandler = (
    done: boolean,
    totalFollowers: number,
    followers: HelixFollow[],
) => void;

export class FollowerListDownloader {
    // Twitch API client
    readonly client : TwitchClient;
    // Event handler for each paginated result from API call
    handler : LoopEventHandler;

    constructor(client: TwitchClient, handler: LoopEventHandler) {
        this.client = client;
        this.handler = handler;
    }

    // streamerID is numeric ID (not username or display name) of streamer
    async download(streamerId: number) {
        const filter = {followedUser: streamerId};
        const request = this.client.helix.users.getFollowsPaginated(filter);

        let follows : HelixFollow[] = null;
        do {
            follows = await request.getNext();
            const totalFollowers = await request.getTotalCount();
            this.handler(follows.length === 0, totalFollowers, follows);
        } while(follows?.length);
    }
}
