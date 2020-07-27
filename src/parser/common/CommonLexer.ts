// Generated from parser/common/Common.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CommonLexer extends Lexer {
	public static readonly WS = 1;
	public static readonly LPAREN = 2;
	public static readonly RPAREN = 3;
	public static readonly AND = 4;
	public static readonly OR = 5;
	public static readonly NOT = 6;
	public static readonly WORD = 7;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"WS", "LPAREN", "RPAREN", "AND", "OR", "NOT", "WORD",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, "'('", "')'", "'&'", "'|'", "'!'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "WS", "LPAREN", "RPAREN", "AND", "OR", "NOT", "WORD",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CommonLexer._LITERAL_NAMES, CommonLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CommonLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(CommonLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "Common.g4"; }

	// @Override
	public get ruleNames(): string[] { return CommonLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return CommonLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return CommonLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return CommonLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\t\'\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x03\x02\x06\x02\x13\n\x02\r\x02\x0E\x02\x14\x03\x02" +
		"\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06" +
		"\x03\x07\x03\x07\x03\b\x06\b$\n\b\r\b\x0E\b%\x02\x02\x02\t\x03\x02\x03" +
		"\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x03\x02" +
		"\x04\x05\x02\v\f\x0F\x0F\"\"\x07\x02\v\f\x0F\x0F\"#((~~\x02(\x02\x03\x03" +
		"\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03" +
		"\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02" +
		"\x02\x02\x03\x12\x03\x02\x02\x02\x05\x18\x03\x02\x02\x02\x07\x1A\x03\x02" +
		"\x02\x02\t\x1C\x03\x02\x02\x02\v\x1E\x03\x02\x02\x02\r \x03\x02\x02\x02" +
		"\x0F#\x03\x02\x02\x02\x11\x13\t\x02\x02\x02\x12\x11\x03\x02\x02\x02\x13" +
		"\x14\x03\x02\x02\x02\x14\x12\x03\x02\x02\x02\x14\x15\x03\x02\x02\x02\x15" +
		"\x16\x03\x02\x02\x02\x16\x17\b\x02\x02\x02\x17\x04\x03\x02\x02\x02\x18" +
		"\x19\x07*\x02\x02\x19\x06\x03\x02\x02\x02\x1A\x1B\x07+\x02\x02\x1B\b\x03" +
		"\x02\x02\x02\x1C\x1D\x07(\x02\x02\x1D\n\x03\x02\x02\x02\x1E\x1F\x07~\x02" +
		"\x02\x1F\f\x03\x02\x02\x02 !\x07#\x02\x02!\x0E\x03\x02\x02\x02\"$\n\x03" +
		"\x02\x02#\"\x03\x02\x02\x02$%\x03\x02\x02\x02%#\x03\x02\x02\x02%&\x03" +
		"\x02\x02\x02&\x10\x03\x02\x02\x02\x05\x02\x14%\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CommonLexer.__ATN) {
			CommonLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CommonLexer._serializedATN));
		}

		return CommonLexer.__ATN;
	}

}

