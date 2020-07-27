
import { CommonTokenStream, CharStreams } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { CommonLexer } from './CommonLexer';
import { CommonParser, NestedExpressionContext, FilterContext, AndExpressionGroupContext, OrExpressionGroupContext, NotExpressionContext, ExpressionContext, Leaf_expressionContext, LeafExpressionContext } from './CommonParser';
import { Filter, AndExpressionGroup, OrExpressionGroup, SimpleExpression } from '../../filter';
import { CommonVisitor } from './CommonVisitor';

export class FilterVisitor extends AbstractParseTreeVisitor<Filter> implements CommonVisitor<Filter> {

    protected defaultResult(): Filter {
        //throw new Error("Method not implemented.");
        return null;
    }

    visitFilter(ctx: FilterContext) : Filter {
        const filter = this.visit(ctx.expression());
        return filter;
    }

    visitNestedExpression(ctx: NestedExpressionContext) : Filter {
        const nestedFilter = this.visit(ctx.expression());
        return null;
    }

    visitAndExpressionGroup (ctx: AndExpressionGroupContext) : Filter {
        const group = new AndExpressionGroup();
        const exps = ctx.expression();
        for(let exp of exps) {
            group.addFilter(this.visit(exp));
        }
        return group;
    }

    visitOrExpressionGroup(ctx: OrExpressionGroupContext) : Filter {
        const group = new OrExpressionGroup();
        const exps = ctx.expression();
        for(let exp of exps) {
            group.addFilter(this.visit(exp));
        }
        return group;
    }

    visitNotExpression(ctx: NotExpressionContext) : Filter {
        const filter = this.visit(ctx.expression());
        filter.not();
        return filter;
    }

    visitExpression(ctx: ExpressionContext) : Filter {
        throw new Error("Method visitExpression is not implemented.");
    }

    visitLeaf_expression(ctx: Leaf_expressionContext) {
        const wordNodes = ctx.WORD();
        const words = wordNodes.map((node) => node.toString());
        return new SimpleExpression(words);
    }
}

export function getFilter(inputString: string) : Filter {
    // Create the lexer and parser
    // const inputString = "text";
    
    const inputStream = CharStreams.fromString(inputString);
    const lexer = new CommonLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new CommonParser(tokenStream);

    // Parse the input
    let tree = parser.filter();
    const filter = new FilterVisitor().visit(tree);
    console.log("filter : " + filter);
    return filter;
}