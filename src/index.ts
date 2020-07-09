
//import {clientId, accessToken} from "./credentials";
//import TwitchClient from "twitch";
import {User, Video, Comment} from "./models";


//function read(jsonObject: object)

async function main() {
    //const twitchClient = TwitchClient.withCredentials(clientId, accessToken);
    //const video = await twitchClient.helix.videos.getVideoById("673529771");
    //video.
    
}


// commentData is JSON object for a comment
function convertComment(commentData: object) : Comment {
    return null;
}


export class CommentRepository {
    userMap: Map<number, User>;
    commentList: Array<Comment>;
    video: Video;

    constructor(commentsData: Array<object>, videoData: object) {

    }
}