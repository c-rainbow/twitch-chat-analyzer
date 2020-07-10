// Filter code

import { User, Comment } from "./models";


export enum Operators {
    LessThan,
    LessThanOrEqualTo,
    GreaterThan,
    GreaterThanOrEqualTo,
    Equal,
    Like,
}

type CommentKey = keyof Comment;
type UserKey = keyof User;


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

    // Whether to use NOT to the entire evaluation
    // ex) (A and (B or C) and D).not() = ~ (A and (B or C) and D)
    not() {
        this.negated = !this.negated;
    }

    eval(comment: Comment, user?: User) : boolean {
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
    protected evalInternal(comment: Comment, user?: User) : boolean {
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
            this.regex = new RegExp(value as string, "i");
        }
    }

    eval(comment: Comment, user?: User) : boolean {
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
    protected evalInternal(comment: Comment, user?: User) : boolean {
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
    protected evalInternal(comment: Comment, user?: User) : boolean {
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