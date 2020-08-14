import { FragmentData, EmoteRangeData, CommenterData, CommentData, UserBadgeData } from "./data_models";
import { toTimeString } from "./timeutil";


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

    // Display string of the Twitch user. Same format as in official Twitch chat html
    getDisplayString() : string {
        if(this.displayName.toLowerCase() === this.username.toLowerCase()) {
            return this.displayName;
        }
        return `${this.displayName}(${this.username})`;
    }
}


export class Emote {
    id: number;
    name: string;
    emoteSetId: string;  // can be empty string

    static parseEmote(data: FragmentData) : Emote {
        if(!data.emoticon) {
            return null;
        }
        const emoteData = data.emoticon;
        const emote = new Emote();
        emote.id = parseInt(emoteData.emoticon_id);
        emote.name = data.text;
        emote.emoteSetId = emoteData.emoticon_set_id;
        return emote;
    }

    getImageUrl() : string {
        // As of July 2020, this address format is up-to-date
        return `https://static-cdn.jtvnw.net/emoticons/v1/${this.id}/1.0`;
    }
}


export class Comment {
    id: string;
    channel: number;
    relativeTime: number;  // Relative time in seconds from video start
    absoluteTime: number;  // epoch time seconds   
    
    bits: number;
    rawText: string;  // Raw text where all emotes are stored as textx
    htmlText: string;  // HTML representation of the chat
    contentText: string;  // Pure text without emotes
    contentLength: number  // Length of chat content, where each emote has length 1
    user: User;
    fragments: FragmentData[];
    emotes: Emote[];  // List of emotes used in the comment
    badges: UserBadgeData[];
    userColor: string;  // Hex code of chat user color

    toDisplayString() : string {
        const timeStr = toTimeString(this.relativeTime);
        return `[${timeStr}] (${this.user.displayName}): ${this.rawText}`;
    }

    static parseComment(data: CommentData) : Comment {
        const comment = new Comment();
        comment.id = data._id;
        comment.channel = Number(data.channel_id);
        comment.relativeTime = data.content_offset_seconds;
        comment.absoluteTime = new Date(data.created_at).getTime() / 1000.0;

        const message = data.message;
        comment.bits = message.bits_spent ?? 0;
        comment.rawText = message.body ?? "";  // Raw text
        comment.fragments = message.fragments ?? [];
        comment.user = User.parseUser(data.commenter);
        comment.badges = message.user_badges ?? [];
        comment.userColor = message.user_color;

        // Build emotes and text contents
        comment.emotes = [];
        const textFragments : string[] = [];
        const htmlFragments : string[] = [];
        comment.contentLength = 0;
        for(let fragmentData of comment.fragments) {
            if(fragmentData.emoticon) {  // Emote fragment
                const emote = Emote.parseEmote(fragmentData);
                comment.emotes.push(emote);
                comment.contentLength += 1;  // For now, emotes are assumed to have content length 1
                // Should this conversion be done in load time or rendering time?
                htmlFragments.push(`<img src="${emote.getImageUrl()}" />`)
            }
            else {  // Text fragment
                const text = fragmentData.text;
                textFragments.push(text.trim());
                comment.contentLength += text.length;
                htmlFragments.push(text);
            }
        }
        // Reduce all spaces between text fragments to just one space, for ease of search and filter
        // TODO: Is this the right way?
        comment.contentText = textFragments.join(" ");
        comment.htmlText = htmlFragments.join("");
    
        return comment;
    }
}

