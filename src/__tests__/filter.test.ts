import { CommentField, Operators, AndExpressionGroup, RegexExpression, ComparisonExpression, CommentStringField, UserField } from "../filter"
import * as path from "path";
import * as fs from "fs"; 
import { Comment } from "../models";
import { CommentData } from "../data_models";

const baseDir = "src/__tests__/data";;
const commentFilePath = path.resolve(baseDir, "comment.json");


let globalComment : Comment;
beforeAll(() => {
    const fileContent = fs.readFileSync(commentFilePath, "utf8");
    const commentData = <CommentData>JSON.parse(fileContent);
    globalComment = Comment.parseComment(commentData);
});

describe("ComparisonExpression test", () => {
    test("Less than", () => {
        // Value 12345678
        const field1: CommentField = {type: "comment", key: "channel"};
        // field less than value
        const exp1 = new ComparisonExpression(field1, Operators.LessThan, 12345679);
        const result1 = exp1.eval(globalComment);
        expect(result1).toStrictEqual(true);
        // field equal to value
        const exp2 = new ComparisonExpression(field1, Operators.LessThan, 12345678);
        const result2 = exp2.eval(globalComment);
        expect(result2).toStrictEqual(false);
        // field greater than value
        const exp3 = new ComparisonExpression(field1, Operators.LessThan, 12345677);
        const result3 = exp3.eval(globalComment);
        expect(result3).toStrictEqual(false);
    });

    test("Less than or equal to", () => {
        // Value 12345678
        const field1: CommentField = {type: "comment", key: "channel"};
        // field less than value
        const exp1 = new ComparisonExpression(field1, Operators.LessThanOrEqualTo, 12345679);
        const result1 = exp1.eval(globalComment);
        expect(result1).toStrictEqual(true);
        // field equal to value
        const exp2 = new ComparisonExpression(field1, Operators.LessThanOrEqualTo, 12345678);
        const result2 = exp2.eval(globalComment);
        expect(result2).toStrictEqual(true);
        // field greater than value
        const exp3 = new ComparisonExpression(field1, Operators.LessThanOrEqualTo, 12345677);
        const result3 = exp3.eval(globalComment);
        expect(result3).toStrictEqual(false);
    });

    test("Greater than", () => {
        // Value 516570261
        const field1: UserField = {type: "user", key: "id"};
        // field less than value
        const exp1 = new ComparisonExpression(field1, Operators.GreaterThan, 516570262);
        const result1 = exp1.eval(globalComment);
        expect(result1).toStrictEqual(false);
        // field equal to value
        const exp2 = new ComparisonExpression(field1, Operators.GreaterThan, 516570261);
        const result2 = exp2.eval(globalComment);
        expect(result2).toStrictEqual(false);
        // field greater than value
        const exp3 = new ComparisonExpression(field1, Operators.GreaterThan, 516570260);
        const result3 = exp3.eval(globalComment);
        expect(result3).toStrictEqual(true);
    });

    test("Greater than or equal to", () => {
        // Value 516570261
        const field1: UserField = {type: "user", key: "id"};
        // field less than value
        const exp1 = new ComparisonExpression(field1, Operators.GreaterThanOrEqualTo, 516570262);
        const result1 = exp1.eval(globalComment);
        expect(result1).toStrictEqual(false);
        // field equal to value
        const exp2 = new ComparisonExpression(field1, Operators.GreaterThanOrEqualTo, 516570261);
        const result2 = exp2.eval(globalComment);
        expect(result2).toStrictEqual(true);
        // field greater than value
        const exp3 = new ComparisonExpression(field1, Operators.GreaterThanOrEqualTo, 516570260);
        const result3 = exp3.eval(globalComment);
        expect(result3).toStrictEqual(true);
    });

    test("Equal", () => {
        // field value is "Hello world :)"
        const commentField: CommentField = {type: "comment", key: "rawText"};

        const exp1 = new ComparisonExpression(commentField, Operators.Equal, "Hello world :)");
        const result1 = exp1.eval(globalComment);
        expect(result1).toStrictEqual(true);

        const exp2 = new ComparisonExpression(commentField, Operators.Equal, "Hello world");
        const result2 = exp2.eval(globalComment);
        expect(result2).toStrictEqual(false);

        // field value is "TestUserName"
        const userField: UserField = {type: "user", key: "displayName"};

        const exp3 = new ComparisonExpression(userField, Operators.Equal, "TestUserName");
        const result3 = exp3.eval(globalComment);
        expect(result3).toStrictEqual(true);

        const exp4 = new ComparisonExpression(userField, Operators.Equal, "Not a test user name");
        const result4 = exp4.eval(globalComment);
        expect(result4).toStrictEqual(false);
    });
});

describe("OrExpressionGroup test", () => {

});

describe("AndExpressionGroup test", () => {

    // Test that a CommentData is correctly converted into Comment object
    test("Parsing test", () => {
        
    });
});