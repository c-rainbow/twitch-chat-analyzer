
import { User, Comment, Emote } from "./models";
import { CommentData } from "./data_models";
import { Filter } from "./filter/filter";
import { Counter } from "./counter";


interface UserWithCount {
    user: User,
    count: number,
}


export class UserRepository {
    readonly userById: Map<number, User>;
    readonly chatCounter: Counter;  // Chat count by user
    
    constructor() {
        this.userById = new Map<number, User>();
        this.chatCounter = new Counter();
    }

    addChatUser(user: User) {
        this.userById.set(user.id, user);
        this.chatCounter.increment(user.id);
    }

    getById(id: number) {
        return this.userById.get(id);
    }

    // Get users with most chats, tie-breaking with user ID
    getTopChatters(topCount = 0) : UserWithCount[] {
        const keysWithCount = this.chatCounter.getTopKeys(topCount);
        return keysWithCount.map((kc) => ({
            user: this.userById.get(kc.key),
            count: kc.count
        }));
    }
}


interface EmoteWithCount {
    emote: Emote,
    count: number,
}


export class EmoteRepository {
    readonly emoteById: Map<number, Emote>;
    readonly emoteByName: Map<string, Emote>;
    readonly totalCounter: Counter;

    constructor() {
        this.emoteById = new Map<number, Emote>();
        this.emoteByName = new Map<string, Emote>();
        this.totalCounter = new Counter();
    }

    getById(id: number) {
        return this.emoteById.get(id);
    }

    getByName(name: string) {
        return this.emoteByName.get(name);
    }

    getCount(id: number) {
        return this.totalCounter.get(id);
    }

    // Get most used {topCount} emotes, tie-breaking with emote ID.
    getTopEmotes(topCount = 0) : EmoteWithCount[] {
        const keysWithCount = this.totalCounter.getTopKeys(topCount);
        return keysWithCount.map((kc) => ({
            emote: this.emoteById.get(kc.key),
            count: kc.count
        }));
    }

    // Add list of emotes from the same chat
    addEmotesInChat(emotes: Emote[]) {
        for(let emote of emotes) {
            this.totalCounter.increment(emote.id);

            const alreadySeen = this.emoteById.has(emote.id);
            if(!alreadySeen) {
                this.emoteById.set(emote.id, emote);
                this.emoteByName.set(emote.name, emote);
            }
        }
    }
}


export class CommentRepository {
    readonly userMap: Map<number, User>;
    readonly userCounter: Counter;
    readonly emoteRepository: EmoteRepository;
    readonly commentList: Comment[];

    constructor(commentsData: CommentData[]) {
        this.userMap = new Map<number, User>();
        this.userCounter = new Counter();
        this.emoteRepository = new EmoteRepository();
        this.commentList = [];

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
        this.emoteRepository.addEmotesInChat(comment.emotes);

        // update commentList
        this.commentList.push(comment);
    }

    userCount() : number {
        return this.userMap.size;
    }

    commentCount() : number {
        return this.commentList.length;
    }

    getTopEmotes(topCount = 0) : EmoteWithCount[] {
        return this.emoteRepository.getTopEmotes(topCount);
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
    // Very unlikely because the relative times are in miliseconds
    return a.id.localeCompare(b.id);
}