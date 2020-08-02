import { Filter, Field, Operators, FieldValueType, StringField, getProperty } from "./filter";
import { Comment } from "../models";
import { OrExpressionGroup } from "./expression_group";



// Filter that checks pattern in both username and displayname
export class GeneralUsernameExpression extends OrExpressionGroup {
    constructor(pattern: string) {
        super();
        this.addRegex({type:"user", key: "username"}, pattern);
        this.addRegex({type:"user", key: "displayName"}, pattern);
    }
}


export class SubscriberExpression extends Filter {
    eval(comment: Comment): boolean {
        for(let badge of comment.badges) {
            if(badge._id === "subscriber") {
                return !this.negated;  // false if negated, true if not negated
            }
        }
        return this.negated;  // true if negated, false if not negated
    }

    toString(): string {
        return "subscriber";
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

    eval(comment: Comment) : boolean {
        const fieldValue = this.getFieldValue(comment);
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

    getFieldValue(comment: Comment): FieldValueType {
        const field = this.field;
        switch(field.type) {
            case "comment":
                return getProperty(comment, field.key);
            case "user":
                return getProperty(comment.user, field.key);
        }
    }

    toString(): string {
        const field = this.field;
        return `${field.type}.${field.key} ${this.op} ${this.value}`;
    }
}


// String regex expression of field value
export class RegexExpression extends Filter {
    toString(): string {
        throw new Error("Method not implemented.");
    }
    readonly field: StringField;
    readonly regex: RegExp;

    constructor(field: StringField, regex: string, flags = "i") {
        super();
        this.field = field;
        this.regex = new RegExp(regex, flags);
    }

    eval(comment: Comment) : boolean { 
        const fieldValue = this.getFieldValue(comment);
        const tested = this.regex.test(fieldValue);
        if(this.negated) {
            return !tested;
        }
        return tested;
    }

    getFieldValue(comment: Comment): string {
        const field = this.field;
        switch(field.type) {
            case "comment":
                return getProperty(comment, field.key);
            case "user":
                return getProperty(comment.user, field.key);
        }
    }
}


// Dummy expression without any actual filter, only for testing purposes. eval() will throw error
export class DummyExpression extends Filter {
    words : string[];

    constructor(words: string[]) {
        super();
        this.words = words.slice();
    }

    eval(comment: Comment): boolean {
        throw new Error("Method not implemented.");
    }

    toString() : string {
        const wordsStr = this.words.join(" ");
        if(this.negated) {
            return "!(" + wordsStr + ")";
        }
        return wordsStr;
    }
}