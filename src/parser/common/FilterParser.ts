
import { CommonTokenStream, CharStreams } from 'antlr4ts';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { CommonLexer } from './CommonLexer';
import { CommonParser, NestedExpressionContext, FilterContext, AndExpressionGroupContext, OrExpressionGroupContext, NotExpressionContext, ExpressionContext, LeafExpressionContext } from './CommonParser';
import { Filter, AndExpressionGroup, OrExpressionGroup, SimpleExpression } from '../../filter';
import { CommonVisitor } from './CommonVisitor';

export class FilterVisitor extends AbstractParseTreeVisitor<Filter> implements CommonVisitor<Filter> {

    protected defaultResult(): Filter {
        throw new Error("defaultResult is not implemented.");
    }

    visitNestedExpression(ctx: NestedExpressionContext) : Filter {
        const nestedFilter = this.visit(ctx.expression());
        return nestedFilter;
    }

    visitAndExpressionGroup (ctx: AndExpressionGroupContext) : Filter {
        const group = new AndExpressionGroup();
        const exps = ctx.expression();
        for(let exp of exps) {
            const subfilter = this.visit(exp);
            if(subfilter instanceof AndExpressionGroup && !subfilter.negated) {
                for(let f of subfilter.filters) {
                    group.addFilter(f);
                }
            }
            else {
                group.addFilter(subfilter);
            }
        }
        return group;
    }

    visitOrExpressionGroup(ctx: OrExpressionGroupContext) : Filter {
        const group = new OrExpressionGroup();
        const exps = ctx.expression();
        for(let exp of exps) {
            const subfilter = this.visit(exp);
            if(subfilter instanceof OrExpressionGroup && !subfilter.negated) {
                for(let f of subfilter.filters) {
                    group.addFilter(f);
                }
            }
            else {
                group.addFilter(subfilter);
            }
        }
        return group;
    }

    visitNotExpression(ctx: NotExpressionContext) : Filter {
        const filter = this.visit(ctx.expression());
        filter.not();
        return filter;
    }

    visitLeafExpression(ctx: LeafExpressionContext) {
        const wordNodes = ctx.WORD();
        const words = wordNodes.map((node) => node.toString());
        return new SimpleExpression(words);
    }
}

export function getFilter(inputString: string) : Filter {
    // Create the lexer and parser    
    const inputStream = CharStreams.fromString(inputString);
    const lexer = new CommonLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new CommonParser(tokenStream);

    // Parse the input
    let tree = parser.expression();
    const filter = new FilterVisitor().visit(tree);
    return filter;
}