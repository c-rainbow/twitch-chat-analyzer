import TwitchClient, { HelixUser, HelixFollow, HelixVideo, User } from 'twitch';
import { ConfigManager } from './config';
import { ChatDownloader, LoopEventHandler as ChatDownloadHandler } from './downloader/chat_downloader';
import { LoopEventHandler as FollowerDownloadHandler, FollowerListDownloader } from './downloader/followerlist';
import { getVideo as getVideoKraken, VideoData } from './downloader/video';
import { UserData, getUserByName as getUserByNameKraken } from './downloader/user';


// Key in session storage to store access token
const accessTokenKey = "twitch_chat_analyzer_access_token";


export class TwitchApiClient {
    readonly innerClient : TwitchClient;
    currentUser : User;
    
    constructor(accessToken?: string) {
        if(!accessToken) {
            accessToken = sessionStorage.getItem(accessTokenKey);
        }
        if(!accessToken) {
            throw new Error("Access Token cannot be found.");
        }
        const clientId = ConfigManager.getClientId();
        this.innerClient = TwitchClient.withCredentials(clientId, accessToken);
    }

    getChatDownloader(handler: ChatDownloadHandler) : ChatDownloader {
        const downloader = new ChatDownloader(handler);
        return downloader;
    }

    getFollowersDownloader(handler: FollowerDownloadHandler) : FollowerListDownloader {
        const downloader = new FollowerListDownloader(this.innerClient, handler);
        return downloader;
    }

    static async getUserByName(username: string) : Promise<UserData> {
        const response = await getUserByNameKraken(username);
        return response.jsonContent ?? null;
    }

    static async getVideo(videoId: string) : Promise<VideoData> {
        const response = await getVideoKraken(videoId);
        return response.jsonContent ?? null;
    }

    async getLoggedInUser() : Promise<User> {
        if(this.currentUser) {
            return this.currentUser;
        }
        const user = await this.innerClient.kraken.users.getMe();
        this.currentUser = user;
        return user;
    }

    async isSubscribedTo(streamerId: number) : Promise<boolean> {
        const currentUser = await this.getLoggedInUser();
        const subscribed = await currentUser.isSubscribedTo(streamerId);
        return subscribed;
    }
}
