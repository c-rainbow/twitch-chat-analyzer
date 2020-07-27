// Generated from parser/common/Common.g4 by ANTLR 4.7.3-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { NestedExpressionContext } from "./CommonParser";
import { AndExpressionGroupContext } from "./CommonParser";
import { OrExpressionGroupContext } from "./CommonParser";
import { NotExpressionContext } from "./CommonParser";
import { LeafExpressionContext } from "./CommonParser";
import { FilterContext } from "./CommonParser";
import { ExpressionContext } from "./CommonParser";
import { Leaf_expressionContext } from "./CommonParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `CommonParser`.
 */
export interface CommonListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `NestedExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNestedExpression?: (ctx: NestedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NestedExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNestedExpression?: (ctx: NestedExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `AndExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpressionGroup?: (ctx: AndExpressionGroupContext) => void;
	/**
	 * Exit a parse tree produced by the `AndExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpressionGroup?: (ctx: AndExpressionGroupContext) => void;

	/**
	 * Enter a parse tree produced by the `OrExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpressionGroup?: (ctx: OrExpressionGroupContext) => void;
	/**
	 * Exit a parse tree produced by the `OrExpressionGroup`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpressionGroup?: (ctx: OrExpressionGroupContext) => void;

	/**
	 * Enter a parse tree produced by the `NotExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NotExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpression?: (ctx: NotExpressionContext) => void;

	/**
	 * Enter a parse tree produced by the `LeafExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLeafExpression?: (ctx: LeafExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LeafExpression`
	 * labeled alternative in `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLeafExpression?: (ctx: LeafExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `CommonParser.filter`.
	 * @param ctx the parse tree
	 */
	enterFilter?: (ctx: FilterContext) => void;
	/**
	 * Exit a parse tree produced by `CommonParser.filter`.
	 * @param ctx the parse tree
	 */
	exitFilter?: (ctx: FilterContext) => void;

	/**
	 * Enter a parse tree produced by `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `CommonParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `CommonParser.leaf_expression`.
	 * @param ctx the parse tree
	 */
	enterLeaf_expression?: (ctx: Leaf_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `CommonParser.leaf_expression`.
	 * @param ctx the parse tree
	 */
	exitLeaf_expression?: (ctx: Leaf_expressionContext) => void;
}

