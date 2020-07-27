

import * as fs from "fs";
import { CommentData } from './data_models';
import { CommentRepository } from './repository';
import { RegexExpression, AndExpressionGroup, OrExpressionGroup } from './filter';
import { performance } from "perf_hooks";
import { getFilter } from './parser/common/FilterParser';

const filePath = "C:/Code/chatlogs/extra_large.json";

function main() {

    const input = "(random filter name & (Follow 1day | subscriber)) | aaaaa & (Bbbb)";
    const f = getFilter(input);
    console.log("f: " + f);
    console.log("type f: " + Object.keys(f));
    console.log("toString: " + f.toString());

    return;

    const beforeFile = performance.now();
    const fileContent = fs.readFileSync(filePath, "utf8");
    const fileJson = JSON.parse(fileContent);
    const commentsData = fileJson["comments"] as Array<CommentData>;
    
    const repository = new CommentRepository(commentsData);
    console.log("User count: " + repository.userCount());
    console.log("Chat count: " + repository.commentCount());
    
    const group = new AndExpressionGroup();
    group.addRegex({type: "user", key: "username"}, "c");
    group.addRegex({type: "comment", key: "rawText"}, "heart");
    group.addGreaterThan({type: "comment", key: "relativeTime"}, 200);

    const beforeFilter = performance.now();
    console.log("Repository created in " + (beforeFilter - beforeFile) + " milliseconds");
    const filtered = repository.filter(group);
    //const filter = new RegexExpression({type: "comment", key: "rawText"}, "ㅋㅋㅋ");
    //const filter = new RegexExpression({type: "user", key: "username"}, "r");

    //const filtered = repository.filter(filter);
    
    const afterFilter = performance.now();
    console.log("Filtered complete in " + (afterFilter - beforeFilter) + " milliseconds");

    console.log(filtered.length);
    for(let i = 0; i < 10; i++) {
        console.log(filtered[i].toDisplayString());
    }
    /*for(let chat of filtered) {
        console.log(chat.toDisplayString());
    }*/
}


main();