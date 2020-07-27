// Generated from parser/common/Common.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { CommonListener } from "./CommonListener";
import { CommonVisitor } from "./CommonVisitor";


export class CommonParser extends Parser {
	public static readonly WS = 1;
	public static readonly LPAREN = 2;
	public static readonly RPAREN = 3;
	public static readonly AND = 4;
	public static readonly OR = 5;
	public static readonly NOT = 6;
	public static readonly WORD = 7;
	public static readonly RULE_filter = 0;
	public static readonly RULE_expression = 1;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"filter", "expression",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'('", "')'", "'&'", "'|'", "'!'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "LPAREN", "RPAREN", "AND", "OR", "NOT", "WORD",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CommonParser._LITERAL_NAMES, CommonParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CommonParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Common.g4"; }

	// @Override
	public get ruleNames(): string[] { return CommonParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return CommonParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(CommonParser._ATN, this);
	}
	// @RuleVersion(0)
	public filter(): FilterContext {
		let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, CommonParser.RULE_filter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 4;
			this.expression(0);
			this.state = 5;
			this.match(CommonParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, CommonParser.RULE_expression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 19;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case CommonParser.LPAREN:
				{
				_localctx = new NestedExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 8;
				this.match(CommonParser.LPAREN);
				this.state = 9;
				this.expression(0);
				this.state = 10;
				this.match(CommonParser.RPAREN);
				}
				break;
			case CommonParser.NOT:
				{
				_localctx = new NotExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 12;
				this.match(CommonParser.NOT);
				this.state = 13;
				this.expression(4);
				}
				break;
			case CommonParser.WORD:
				{
				_localctx = new LeafExpressionContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 15;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 14;
						this.match(CommonParser.WORD);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 17;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 29;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 27;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 2, this._ctx) ) {
					case 1:
						{
						_localctx = new AndExpressionGroupContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, CommonParser.RULE_expression);
						this.state = 21;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 22;
						this.match(CommonParser.AND);
						this.state = 23;
						this.expression(4);
						}
						break;

					case 2:
						{
						_localctx = new OrExpressionGroupContext(new ExpressionContext(_parentctx, _parentState));
						this.pushNewRecursionContext(_localctx, _startState, CommonParser.RULE_expression);
						this.state = 24;
						if (!(this.precpred(this._ctx, 2))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						}
						this.state = 25;
						this.match(CommonParser.OR);
						this.state = 26;
						this.expression(3);
						}
						break;
					}
					}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);

		case 1:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\t#\x04\x02\t" +
		"\x02\x04\x03\t\x03\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x06\x03\x12\n\x03\r\x03\x0E\x03\x13" +
		"\x05\x03\x16\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07" +
		"\x03\x1E\n\x03\f\x03\x0E\x03!\v\x03\x03\x03\x02\x02\x03\x04\x04\x02\x02" +
		"\x04\x02\x02\x02\x02%\x02\x06\x03\x02\x02\x02\x04\x15\x03\x02\x02\x02" +
		"\x06\x07\x05\x04\x03\x02\x07\b\x07\x02\x02\x03\b\x03\x03\x02\x02\x02\t" +
		"\n\b\x03\x01\x02\n\v\x07\x04\x02\x02\v\f\x05\x04\x03\x02\f\r\x07\x05\x02" +
		"\x02\r\x16\x03\x02\x02\x02\x0E\x0F\x07\b\x02\x02\x0F\x16\x05\x04\x03\x06" +
		"\x10\x12\x07\t\x02\x02\x11\x10\x03\x02\x02\x02\x12\x13\x03\x02\x02\x02" +
		"\x13\x11\x03\x02\x02\x02\x13\x14\x03\x02\x02\x02\x14\x16\x03\x02\x02\x02" +
		"\x15\t\x03\x02\x02\x02\x15\x0E\x03\x02\x02\x02\x15\x11\x03\x02\x02\x02" +
		"\x16\x1F\x03\x02\x02\x02\x17\x18\f\x05\x02\x02\x18\x19\x07\x06\x02\x02" +
		"\x19\x1E\x05\x04\x03\x06\x1A\x1B\f\x04\x02\x02\x1B\x1C\x07\x07\x02\x02" +
		"\x1C\x1E\x05\x04\x03\x05\x1D\x17\x03\x02\x02\x02\x1D\x1A\x03\x02\x02\x02" +
		"\x1E!\x03\x02\x02\x02\x1F\x1D\x03\x02\x02\x02\x1F \x03\x02\x02\x02 \x05" +
		"\x03\x02\x02\x02!\x1F\x03\x02\x02\x02\x06\x13\x15\x1D\x1F";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CommonParser.__ATN) {
			CommonParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CommonParser._serializedATN));
		}

		return CommonParser.__ATN;
	}

}

export class FilterContext extends ParserRuleContext {
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public EOF(): TerminalNode { return this.getToken(CommonParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CommonParser.RULE_filter; }
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterFilter) {
			listener.enterFilter(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitFilter) {
			listener.exitFilter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitFilter) {
			return visitor.visitFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return CommonParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class NestedExpressionContext extends ExpressionContext {
	public LPAREN(): TerminalNode { return this.getToken(CommonParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(CommonParser.RPAREN, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterNestedExpression) {
			listener.enterNestedExpression(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitNestedExpression) {
			listener.exitNestedExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitNestedExpression) {
			return visitor.visitNestedExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExpressionContext extends ExpressionContext {
	public NOT(): TerminalNode { return this.getToken(CommonParser.NOT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterNotExpression) {
			listener.enterNotExpression(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitNotExpression) {
			listener.exitNotExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitNotExpression) {
			return visitor.visitNotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionGroupContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public AND(): TerminalNode { return this.getToken(CommonParser.AND, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterAndExpressionGroup) {
			listener.enterAndExpressionGroup(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitAndExpressionGroup) {
			listener.exitAndExpressionGroup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitAndExpressionGroup) {
			return visitor.visitAndExpressionGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionGroupContext extends ExpressionContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public OR(): TerminalNode { return this.getToken(CommonParser.OR, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterOrExpressionGroup) {
			listener.enterOrExpressionGroup(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitOrExpressionGroup) {
			listener.exitOrExpressionGroup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitOrExpressionGroup) {
			return visitor.visitOrExpressionGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LeafExpressionContext extends ExpressionContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(CommonParser.WORD);
		} else {
			return this.getToken(CommonParser.WORD, i);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: CommonListener): void {
		if (listener.enterLeafExpression) {
			listener.enterLeafExpression(this);
		}
	}
	// @Override
	public exitRule(listener: CommonListener): void {
		if (listener.exitLeafExpression) {
			listener.exitLeafExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: CommonVisitor<Result>): Result {
		if (visitor.visitLeafExpression) {
			return visitor.visitLeafExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


