import { LeafExpressionParser } from "../common/FilterParser";
import { Filter, BitExpression } from '../../filter/filter';
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
    throw new Error("아직 구현되지 않았습니다");
}