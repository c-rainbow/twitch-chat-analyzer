
import { User, Comment, Emote } from "./models";
import { CommentData } from "./data_models";
import { Filter } from "./filter/filter";
import { Counter } from "./counter";


export class CommentRepository {
    readonly userMap: Map<number, User>;
    readonly emoteMap: Map<number, Emote>;
    readonly commentList: Comment[];

    readonly userCounter: Counter;
    readonly emoteCounter: Counter;

    constructor(commentsData: CommentData[]) {
        this.userMap = new Map<number, User>();
        this.emoteMap = new Map<number, Emote>();
        this.commentList = [];

        this.userCounter = new Counter();
        this.emoteCounter = new Counter();

        for(let commentData of commentsData) {
            this.addCommentData(commentData);
        }
        // Just in case the commentList is not sorted by time
        this.commentList.sort(commentCompareFn);
    }

    addCommentData(commentData: CommentData) {
        const comment = Comment.parseComment(commentData);
        // Update users
        const user = comment.user;
        this.userMap.set(user.id, user);
        this.userCounter.increment(user.id);

        // Update emotes
        const emotes = comment.emotes;
        for(let emote of emotes) {
            this.emoteMap.set(emote.id, emote);
            this.emoteCounter.increment(emote.id);
        }

        // update commentList
        this.commentList.push(comment);
    }

    userCount() : number {
        return this.userMap.size;
    }

    commentCount() : number {
        return this.commentList.length;
    }

    filter(ft: Filter) : Comment[] {
        return this.commentList.filter((comment) => ft.eval(comment));
    }
}


function commentCompareFn(a: Comment, b: Comment) : number {
    const aTime = a.relativeTime, bTime = b.relativeTime;
    if(aTime < bTime) {
        return -1;
    }
    if(aTime > bTime) {
        return 1;
    }
    // If two comments are posted at the same time, compare by id.
    return a.id.localeCompare(b.id);
}