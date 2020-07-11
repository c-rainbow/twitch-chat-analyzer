import { FragmentData, EmoteRangeData, CommenterData, CommentData } from "./data_models";


export class User {
    id: number;
    username: string;
    displayName: string;
    createdTime: number;  // epoch time seconds
    type: string;

    static parseUser(data: CommenterData) : User {
        const user = new User();
        user.id = Number(data._id);
        user.username = data.name;
        user.displayName = data.display_name;
        user.createdTime = new Date(data.created_at).getTime() / 1000.0;
        user.type = data.type;
    
        return user;
    }
}


export class Comment {
    id: string;
    channel: number;
    relativeTime: number;  // Relative time in seconds from video start
    absoluteTime: number;  // epoch time seconds
    rawText: string;  // Raw text where all emotes
    fragments: Array<FragmentData>;
    emotes: Array<EmoteRangeData>;
    user: User;

    static parseComment(data: CommentData) : Comment {
        const comment = new Comment();
        comment.id = data._id;
        comment.channel = Number(data.channel_id);
        comment.relativeTime = data.content_offset_seconds;
        comment.absoluteTime = new Date(data.created_at).getTime() / 1000.0;
        comment.rawText = data.message.body;  // Raw text where all emotes
        comment.fragments = data.message.fragments;
        comment.emotes = data.message.emoticons || [];
        comment.user = User.parseUser(data.commenter);
    
        return comment;
    }
}

