
import { User, Comment } from "./models";
import { CommentData } from "./data_models";
import { Filter } from "./filter";


export class CommentRepository {
    readonly userMap: Map<number, User>;
    readonly commentList: Array<Comment>;

    constructor(commentsData: Array<CommentData>) {
        this.userMap = new Map<number, User>();
        this.commentList = [];
        for(let commentData of commentsData) {
            this.addCommentData(commentData);
        }
        // Just in case the commentList is not sorted by time
        this.commentList.sort(commentCompareFn);
    }

    addCommentData(commentData: CommentData) {
        const comment = Comment.parseComment(commentData);
        const user = comment.user;
        // Update userMap
        this.userMap.set(user.id, user);
        // update commentList
        this.commentList.push(comment);
    }

    filter(ft: Filter) : Array<Comment> {
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