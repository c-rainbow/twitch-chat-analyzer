grammar Korean;


filter : expression EOF;

expression
  : LPAREN expression RPAREN  # NestedExpression
  | expression AND expression  # AndExpressionGroup
  | expression OR expression  # OrExpressionGroup
  | NOT expression  # NotExpression
//  | follow_expression  # FollowExpression
//  | sub_expression  # SubExpression
  | custom_expression  # CustomExpression
;
/*
follow_expression
  : 'follow' WORD+
;

sub_expression
  : 'goodocja'
  | 'bgoodocja'
  | 'goodoc' WORD+
;
*/
custom_expression : WORD WORD*;
/*
all_text : WORD WORD+ | WORD;
*/
NUMBER : [0-9]+;
LPAREN : '(';
RPAREN : ')';
AND : '&';
OR : '|';
NOT : '!';
WORD : [a-zA-Z0-9]+;
WHITESPACE : [ \t\r\n]+ -> skip;
//NEWLINE : [\r\n]+ -> skip;
UNICODE: [\uAC00-\uD7A3];