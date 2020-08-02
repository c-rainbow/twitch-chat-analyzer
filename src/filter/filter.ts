// Filter code

import { User, Comment } from "../models";


// Discriminated union of comment and user field names
export type Field = CommentField | UserField | StringField;
export type FieldValueType = string | number;

type CommentFieldKey = CommentFieldNumberKey | CommentFieldStringKey;
type CommentFieldNumberKey = "channel" | "relativeTime" | "absoluteTime";
type CommentFieldStringKey = "id" | "rawText";

export interface CommentField {
    type: "comment";
    key: CommentFieldKey;
}

type UserFieldKey = UserFieldNumberKey | UserFieldStringKey;
type UserFieldNumberKey = "id" | "createdTime";
type UserFieldStringKey = "username" | "displayName" | "type";

export interface UserField {
    type: "user";
    key: UserFieldKey;
}

export type StringField = CommentStringField | UserStringField;

export interface CommentStringField {
    type: "comment";
    key: CommentFieldStringKey;
}

export interface UserStringField {
    type: "user";
    key: UserFieldStringKey;
}

// Static type checks with field keys
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


export enum Operators {
    LessThan = "<",
    LessThanOrEqualTo = "<=",
    GreaterThan = ">",
    GreaterThanOrEqualTo = ">=",
    Equal = "==",
}


// Filter types
export abstract class Filter {
    negated: boolean;
    constructor() {
        this.negated = false;
    }

    // Whether to use NOT to the entire evaluation
    // ex) (A and (B or C) and D).not() = ~ (A and (B or C) and D)
    not() : Filter {
        this.negated = !this.negated;
        return this;
    }

    isNot() : boolean {
        return this.negated;
    }

    abstract eval(comment: Comment) : boolean;
    abstract toString() : string;
}


// TypeScript way of getting a property value. Returns null if obj is null or undefined
export function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj?.[key];
}