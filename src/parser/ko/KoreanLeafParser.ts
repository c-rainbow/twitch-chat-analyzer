import { LeafExpressionParser } from "../common/FilterParser";
import { Filter } from "../../filter/filter";


export class KoreanLeafParser implements LeafExpressionParser {
    parse(tokens: string[]): Filter {
        throw new Error("Method not implemented.");
    }

}