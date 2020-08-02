
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

    addChatter(user: User) {
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

    getUserCount() : number {
        return this.userById.size;
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
    addChatEmotes(emotes: Emote[]) {
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
    readonly userRepository: UserRepository;
    readonly emoteRepository: EmoteRepository;
    readonly commentList: Comment[];

    constructor(comments: Comment[]) {
        this.userRepository = new UserRepository();
        this.emoteRepository = new EmoteRepository();
        this.commentList = [];

        for(const comment of comments) {
            this.addComment(comment);
        }

        // Just in case the commentList is not sorted by time
        this.commentList.sort(commentCompareFn);
    }
 
    addComment(comment: Comment) {
        this.userRepository.addChatter(comment.user);
        this.emoteRepository.addChatEmotes(comment.emotes);
        this.commentList.push(comment);
    }

    getUserCount() : number {
        return this.userRepository.getUserCount();
    }

    getCommentCount() : number {
        return this.commentList.length;
    }

    getTopEmotes(topCount = 0) : EmoteWithCount[] {
        return this.emoteRepository.getTopEmotes(topCount);
    }

    getTopChatters(topCount = 0) : UserWithCount[] {
        return this.userRepository.getTopChatters(topCount);
    }

    getComments() : Comment[] {
        return this.commentList;
    }

    filter(ft: Filter) : Comment[] {
        return this.commentList.filter((comment) => ft.eval(comment));
    }

    static fromCommentsData(commentsData: CommentData[]) : CommentRepository {
        const comments = commentsData.map(Comment.parseComment);
        return new CommentRepository(comments);
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
    // If two comments are posted at the same time, compare by id for tie-breaking.
    // Very unlikely because the relative times are in miliseconds
    return a.id.localeCompare(b.id);
}