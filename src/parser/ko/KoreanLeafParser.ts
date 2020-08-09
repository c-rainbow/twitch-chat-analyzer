import { LeafExpressionParser } from "../common/FilterParser";
import { Filter, BitExpression, ComparisonExpression, Operators } from '../../filter/filter';
import {
    GeneralUsernameExpression, SubscriberExpression, GeneralChatRegexExpression,
    ChatLengthExpression } from "../../filter/filter";


export class KoreanLeafParser implements LeafExpressionParser {
    parse(tokens: string[]): Filter {
        const command = tokens[0];
        const parameters = tokens.slice(1);
        switch(command) {
            case "아이디": 
                return new GeneralUsernameExpression(parameters);
            case "구독자":
                return new SubscriberExpression();
            case "비구독자":
                return new SubscriberExpression().not();
            case "내용":
                return new GeneralChatRegexExpression(parameters);
            case "길이":
                return parseChatLength(parameters);
            case "비트":
                return new BitExpression();
        }
        throw new Error(`알 수 없는 명령어입니다: ${command}`);
    }
}

function parseChatLength(parameters: string[]) : ChatLengthExpression {
    const length = Number(parameters?.[0]);
    const op = getOperator(parameters?.[1]);
    if(length && op !== Operators.Invalid) {
        return new ComparisonExpression(
            {type: "comment", key: "contentLength"}, op, length);
    }
    const joined = (parameters ?? []).join(" ");
    throw new Error(`해석할 수 없는 표현입니다: '${joined}'`);
}

function getOperator(exp: string) : Operators {
    switch(exp) {
        case "초과":
            return Operators.GreaterThan;
        case "이상":
            return Operators.GreaterThanOrEqualTo;
        case "미만":
            return Operators.LessThan;
        case "이하":
            return Operators.LessThanOrEqualTo;
        default:
            return Operators.Invalid;
    }
}