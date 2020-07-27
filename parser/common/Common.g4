
grammar Common;

filter : expression EOF;

expression
  : LPAREN expression RPAREN  # NestedExpression

  // Container-level filter expressions
  | NOT expression  # NotExpression
  | expression AND expression  # AndExpressionGroup
  | expression OR expression  # OrExpressionGroup

  // Leaf-level filter expressions
  | WORD+  # LeafExpression
;

//leaf_expression : WORD+; 

WS : [ \t\r\n]+ -> skip;

LPAREN : '(';
RPAREN : ')';
AND : '&';
OR : '|';
NOT : '!';

WORD : 
  // Any character except whitespaces and control characters
  ~([ \t\r\n] | '(' | ')' | '&' | '|' | '!')+
;