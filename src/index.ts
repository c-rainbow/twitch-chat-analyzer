
//import {clientId, accessToken} from "./credentials";
//import TwitchClient from "twitch";
import {User, Video, Comment} from "./models";
import { CommentData, CommenterData } from "./data_models";


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
}


export enum Operators {
    LessThan,
    LessThanOrEqualTo,
    GreaterThan,
    GreaterThanOrEqualTo,
    Equal,
    Like,
}


export abstract class Filter {
    readonly filters: Array<Filter>;
    negated: boolean;

    constructor() {
        this.filters = [];
        this.negated = false;
    }

    addLessThan(field: string, value: number) : Filter {
        return this.addExpression(field, Operators.LessThan, value);
    }

    addLessThanOrEqualTo(field: string, value: number) : Filter {
        return this.addExpression(field, Operators.LessThanOrEqualTo, value);
    }

    addGreaterThan(field: string, value: number) : Filter{
        return this.addExpression(field, Operators.GreaterThan, value);
    }

    addGreaterThanOrEqualTo(field: string, value: number) : Filter {
        return this.addExpression(field, Operators.GreaterThanOrEqualTo, value);
    }

    addEqual(field: string, value: number) : Filter {
        return this.addExpression(field, Operators.Equal, value);
    }

    addLike(field: string, regex: string) : Filter {
        return this.addExpression(field, Operators.Like, regex);
    }

    not() {
        this.negated = !this.negated;
    }

    eval(comment: Comment, user: User) : boolean {
        if(this.filters.length == 0) {
            throw new Error("Filter is empty");
        }
        return this.evalInternal(comment, user);
    }

    addExpression(field: string, op: Operators, value: string | number) : Filter {
        const exp = new Expression(field, op, value);
        this.filters.push(exp);
        return this;
    }

    // To be implemented by AndFilter and OrFilter
    protected evalInternal(comment: Comment, user: User) : boolean {
        throw new Error("Not implemented");
    };
}

export class Expression extends Filter {
    readonly field: string;
    readonly op: Operators;
    readonly value: string | number;
    readonly regex?: RegExp;

    constructor(field: string, op: Operators, value: string | number) {
        super();
        this.field = field;
        this.op = op;
        this.value = value;
        if(op == Operators.Like) {
            this.regex = new RegExp(value as string);
        }
    }

    eval(comment: Comment, user: User) : boolean {
        const fieldValue = this.getFieldValue(comment, user);
        switch(this.op) {
            case Operators.LessThan:
                return fieldValue < this.value;
            case Operators.LessThanOrEqualTo:
                return fieldValue <= this.value;
            case Operators.GreaterThan:
                return fieldValue > this.value;
            case Operators.GreaterThanOrEqualTo:
                return fieldValue >= this.value;
            case Operators.Equal:
                return fieldValue === this.value;
            case Operators.Like:
                return this.regex.test(fieldValue as string);
        }
    }

    getFieldValue(comment: Comment, user: User): string | number {
        return null;
    }
}

export class OrFilter extends Filter {
    protected evalInternal(comment: Comment, user: User) : boolean {
        for(let filter of this.filters) {
            let evaluated = filter.eval(comment, user);
            if(this.negated) {
                evaluated = !evaluated;
            }
            if(evaluated) {
                return true;
            }
        }
        return false;
    }
}

export class AndFilter extends Filter {
    protected evalInternal(comment: Comment, user: User) : boolean {
        for(let filter of this.filters) {
            let evaluated = filter.eval(comment, user);
            if(this.negated) {
                evaluated = !evaluated;
            }
            if(!evaluated) {
                return false;
            }
        }
        return true;
    }
}

export class Query {

}