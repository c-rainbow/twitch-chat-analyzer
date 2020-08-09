import { KoreanLeafParser } from "./KoreanLeafParser";
import { getFilter } from "../common/FilterParser";
import { Filter } from "../../filter/filter";


const leafParser = new KoreanLeafParser();

export default function getFilterFromText(filterText: string) : Filter {
    const filter = getFilter(filterText, leafParser);
    return filter;
}
