import { getFilter } from '../FilterParser';
import { AndExpressionGroup } from '../../../filter/expression_group';
import { DummyExpression } from '../../../filter/leaf_expression';




describe("Parser test", () => {
    test("Leaf node test", () => {
        
    });

    test("AND/OR expression group test", () => {
        const f1 = getFilter("hello world & bye world") as AndExpressionGroup;
        
        expect(f1.filters.length).toBe(2);
        const subf1 = f1.filters[0] as DummyExpression;
        const subf2 = f1.filters[1] as DummyExpression;
        expect(subf1.words).toStrictEqual(["hello", "world"]);
        expect(subf2.words).toStrictEqual(["bye", "world"]);
    });

    test("NOT expression test", () => {

    });

    test("More complicated expression group test", () => {

    });

    test("Unicode test", () => {

    });
});