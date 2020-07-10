
//import {clientId, accessToken} from "./credentials";
//import TwitchClient from "twitch";
import { User, Video, Comment } from "./models";
import { CommentData, CommenterData } from "./data_models";
import { Filter } from "./filter";


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
    readonly userMap: Map<number, User>;
    readonly commentList: Array<Comment>;
    //video: Video;

    constructor(commentsData: Array<CommentData>) {
        this.userMap = new Map<number, User>();
        this.commentList = [];
        for(let commentData of commentsData) {
            // Update userMap
            const user = this.parseUser(commentData.commenter);
            this.userMap.set(user.user_id, user);
            // update commentList
            const comment = this.parseComment(commentData);
            this.commentList.push(comment);
        }
        // Just in case the commentList is not sorted by time
        this.commentList.sort((a, b) => a.created_at - b.created_at);
    }

    parseUser(data: CommenterData) : User {
        return null;
    }

    parseComment(data: CommentData) : Comment {
        return null;
    }

    filter(ft: Filter) : Array<Comment> {
        return this.commentList.filter((comment) => ft.eval(comment));
    }
}


export class Query {

}