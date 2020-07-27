// Generated from parser/common/Common.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { NestedExpressionContext } from "./CommonParser";
import { NotExpressionContext } from "./CommonParser";
import { AndExpressionGroupContext } from "./CommonParser";
import { OrExpressionGroupContext } from "./CommonParser";
import { LeafExpressionContext } from "./CommonParser";
import { FilterContext } from "./CommonParser";
import { ExpressionContext } from "./CommonParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CommonParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface CommonVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `NestedExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedExpression?: (ctx: NestedExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `NotExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpression?: (ctx: NotExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by the `AndExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpressionGroup?: (ctx: AndExpressionGroupContext) => Result;

	/**
	 * Visit a parse tree produced by the `OrExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpressionGroup?: (ctx: OrExpressionGroupContext) => Result;

	/**
	 * Visit a parse tree produced by the `LeafExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLeafExpression?: (ctx: LeafExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `CommonParser.filter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter?: (ctx: FilterContext) => Result;

	/**
	 * Visit a parse tree produced by `CommonParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
}

