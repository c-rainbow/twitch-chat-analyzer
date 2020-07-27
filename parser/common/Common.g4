
grammar Common;

filter : expression EOF;

expression
  : LPAREN expression RPAREN  # NestedExpression

  // Container-level filter expressions
  | expression AND expression  # AndExpressionGroup
  | expression OR expression  # OrExpressionGroup
  | NOT expression  # NotExpression

  // Leaf-level filter expressions
  | leaf_expression  # LeafExpression
;

leaf_expression : WORD+; 

WS : [ \t\r\n]+ -> skip;

LPAREN : '(';
RPAREN : ')';
AND : '&';
OR : '|';
NOT : '!';

WORD : 
  ~([ \t\r\n] | '&' | '|' | '!')+
;//  | ([\u0000-\uFFFF\u{10000}-\u{10FFFF}])+; 