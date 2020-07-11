// Filter code

import { User, Comment } from "./models";


// Discriminated union of comment and user field names
export type Field = CommentField | UserField | StringField;
export type FieldValueType = string | number;

type CommentFieldKey = CommentFieldNumberKey | CommentFieldStringKey;
type CommentFieldNumberKey = "channel";
type CommentFieldStringKey = "id";

export interface CommentField {
    type: "comment";
    key: CommentFieldKey;
}

type UserFieldKey = UserFieldNumberKey | UserFieldStringKey;
type UserFieldNumberKey = "id";
type UserFieldStringKey = "username" | "displayName" ;

export interface UserField {
    type: "user";
    key: UserFieldKey;
}

type StringField = CommentStringField | UserStringField;

export interface CommentStringField {
    type: "comment";
    key: CommentFieldStringKey;
}

export interface UserStringField {
    type: "user";
    key: UserFieldStringKey;
}

// Type checks with field keys
{
    // CommentFieldKey must be subtype of "keyof Comment"
    const c : keyof Comment = <CommentFieldKey>null;
    // Property value from key CommentFieldStringKey must be string
    const cs : string = getProperty(<Comment>null, <CommentFieldStringKey>null);
    // Property value from key CommentFieldNumberKey must be number
    const cn : number = getProperty(<Comment>null, <CommentFieldNumberKey>null);

    // UserFieldKey must be subtype of "keyof User"
    const u : keyof User = <UserFieldKey>null;
    // Property value from key UserFieldStringKey must be string
    const us : string = getProperty(<User>null, <UserFieldStringKey>null);
    // Property value from key UserFieldNumberKey must be number
    const un : number = getProperty(<User>null, <UserFieldNumberKey>null);
}


enum Operators {
    LessThan,
    LessThanOrEqualTo,
    GreaterThan,
    GreaterThanOrEqualTo,
    Equal,
}


// Filter types
export abstract class Filter {
    negated: boolean;
    constructor() {
        this.negated = false;
    }

    // Whether to use NOT to the entire evaluation
    // ex) (A and (B or C) and D).not() = ~ (A and (B or C) and D)
    not() {
        this.negated = !this.negated;
    }

    abstract eval(comment: Comment, user?: User) : boolean;
}


export abstract class ExpressionGroup extends Filter {
    readonly filters: Array<Filter>;

    constructor() {
        super();
        this.filters = [];
    }

    addLessThan(field: Field, value: FieldValueType) : ExpressionGroup {
        return this.addExpression(field, Operators.LessThan, value);
    }

    addLessThanOrEqualTo(field: Field, value: FieldValueType) : ExpressionGroup {
        return this.addExpression(field, Operators.LessThanOrEqualTo, value);
    }

    addGreaterThan(field: Field, value: FieldValueType) : ExpressionGroup{
        return this.addExpression(field, Operators.GreaterThan, value);
    }

    addGreaterThanOrEqualTo(field: Field, value: FieldValueType) : ExpressionGroup {
        return this.addExpression(field, Operators.GreaterThanOrEqualTo, value);
    }

    addEqual(field: Field, value: FieldValueType) : ExpressionGroup {
        return this.addExpression(field, Operators.Equal, value);
    }

    addRegex(field: StringField, regex: string, flag?: string) : ExpressionGroup {
        const exp = new RegexExpression(field, regex, flag);
        this.filters.push(exp);
        return this;
    }

    addExpression(field: Field, op: Operators, value: FieldValueType) : ExpressionGroup {
        const exp = new ComparisonExpression(field, op, value);
        this.filters.push(exp);
        return this;
    }

    eval(comment: Comment, user?: User) : boolean {
        if(this.filters.length == 0) {
            throw new Error("Filter is empty");
        }
        return this.evalInternal(comment, user);
    }

    // To be implemented by AndExpressionGroup and OrExpressionGroup
    protected evalInternal(comment: Comment, user?: User) : boolean {
        throw new Error("Not implemented");
    };
}


// higher-level filter where subfilters are grouped by OR condition
export class OrExpressionGroup extends ExpressionGroup {
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


// higher-level filter where subfilters are grouped by AND condition
export class AndExpressionGroup extends ExpressionGroup {
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


/**
 * Expression to compare field value to a user-provided value
 * ex) comment.length < 100
 * 
 * TypeScript cannot check in compile time if the field and the user-provided value
 * have the same type. It is the responsibility of users not to pass the value of a 
 * different type. For example,
 * 
 *     comment.length < "100"   shouldn't be used (although works in reality)
 *     comment.length < 100     should be used
 */
export class ComparisonExpression extends Filter {
    readonly field: Field;
    readonly op: Operators;
    readonly value: FieldValueType;

    constructor(field: Field, op: Operators, value: FieldValueType) {
        super();
        this.field = field;
        this.op = op;
        this.value = value;
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
        }
    }

    getFieldValue(comment: Comment, user?: User): FieldValueType {
        const field = this.field;
        switch(field.type) {
            case "comment":
                return getProperty(comment, field.key);
            case "user":
                return getProperty(user, field.key);
        }
    }
}


// String regex expression of field value
export class RegexExpression extends Filter {
    readonly field: StringField;
    readonly regex: RegExp;

    constructor(field: StringField, regex: string, flags = "i") {
        super();
        this.field = field;
        this.regex = new RegExp(regex, flags);
    }

    eval(comment: Comment, user?: User) : boolean { 
        const fieldValue = this.getFieldValue(comment, user);
        const tested = this.regex.test(fieldValue);
        if(this.negated) {
            return !tested;
        }
        return tested;
    }

    getFieldValue(comment: Comment, user?: User): string {
        const field = this.field;
        switch(field.type) {
            case "comment":
                return getProperty(comment, field.key);
            case "user":
                return getProperty(user, field.key);
        }
    }
}


// TypeScript way of getting a property value. Returns null if obj is null or undefined
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj?.[key];
}