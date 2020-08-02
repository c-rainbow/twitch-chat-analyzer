import { Filter, FieldValueType, Field, Operators, StringField } from "./filter";
import { Comment } from "../models";
import { RegexExpression, ComparisonExpression } from "./leaf_expression";

export abstract class ExpressionGroup extends Filter {
    readonly filters: Filter[];

    constructor() {
        super();
        this.filters = []; 
    }

    addFilter(filter: Filter) {
        this.filters.push(filter);
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

    eval(comment: Comment) : boolean {
        if(this.filters.length == 0) {
            throw new Error("Filter is empty");
        }
        return this.evalInternal(comment);
    }

    // To be implemented by AndExpressionGroup and OrExpressionGroup
    protected abstract evalInternal(comment: Comment) : boolean;
}


// higher-level filter where subfilters are grouped by OR condition
export class OrExpressionGroup extends ExpressionGroup {
    protected evalInternal(comment: Comment) : boolean {
        for(let filter of this.filters) {
            let evaluated = filter.eval(comment);
            if(this.negated) {
                evaluated = !evaluated;
            }
            if(evaluated) {
                return true;
            }
        }
        return false;
    }

    toString() : string {
        const tokens = [];
        if(this.negated) {
            tokens.push("!");
        }
        tokens.push("(");
        for(let subFilter of this.filters) {
            tokens.push(subFilter.toString());
            tokens.push(' | ');
        }
        tokens[tokens.length-1] = ")";
        return tokens.join("");
    }
}


// higher-level filter where subfilters are grouped by AND condition
export class AndExpressionGroup extends ExpressionGroup {
    protected evalInternal(comment: Comment) : boolean {
        for(let filter of this.filters) {
            let evaluated = filter.eval(comment);
            if(this.negated) {
                evaluated = !evaluated;
            }
            if(!evaluated) {
                return false;
            }
        }
        return true;
    }

    toString() : string {
        const tokens = [];
        if(this.negated) {
            tokens.push("!");
        }
        tokens.push("(");
        for(let subFilter of this.filters) {
            tokens.push(subFilter.toString());
            tokens.push(' & ');
        }
        tokens[tokens.length-1] = ")";
        return tokens.join("");
    }
}