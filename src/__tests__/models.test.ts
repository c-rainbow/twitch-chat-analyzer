
import * as path from "path";
import * as fs from "fs"; 

import { Comment } from "../models";
import { CommentData } from "../data_models";

const baseDir = "src/__tests__/data";
const commentPath = path.resolve(baseDir, "comment.json");

describe("Model Test", () => {

    // Test that a CommentData is correctly converted into Comment object
    test("Parsing test", () => {
        const data = fs.readFileSync(commentPath, "utf8");
        const commentData = JSON.parse(data) as CommentData;
        const comment = Comment.parseComment(commentData);
        
        // Primitive field values
        expect(comment.id).toStrictEqual("59d2b1be-2a56-4a23-c315-1a2bd2a03a19");
        expect(comment.channel).toStrictEqual(12345678);
        expect(comment.relativeTime).toStrictEqual(2345.678);
        expect(comment.absoluteTime).toStrictEqual(1594214245.153);
        expect(comment.rawText).toStrictEqual("Hello world :)");
        // Fragments
        expect(comment.fragments.length).toStrictEqual(2);
        expect(comment.fragments[0].text).toStrictEqual("Hello world ");
        expect(comment.fragments[1].text).toStrictEqual(":)");
        expect(comment.fragments[1].emoticon.emoticon_id).toStrictEqual("1");
        // Emotes
        expect(comment.emotes.length).toStrictEqual(1);
        expect(comment.emotes[0]._id).toStrictEqual("1");
        expect(comment.emotes[0].begin).toStrictEqual(12);
        expect(comment.emotes[0].end).toStrictEqual(13);
        // User
        const user = comment.user;
        expect(user.id).toStrictEqual(516570261);
        expect(user.username).toStrictEqual("testusername");
        expect(user.displayName).toStrictEqual("TestUserName");
        expect(user.createdTime).toStrictEqual(1577901577.740);
        expect(user.type).toStrictEqual("user");
    });

});