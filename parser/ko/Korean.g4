grammar Korean;


filter : expression EOF;

expression
  : LPAREN expression RPAREN  # NestedExpression

  // Container-level filter expressions
  | expression AND expression  # AndExpressionGroup
  | expression OR expression  # OrExpressionGroup
  | NOT expression  # NotExpression

  // Leaf-level filter expressions
  | username_expression  # UsernameExpression
  | follow_expression  # FollowExpression
  | sub_expression  # SubExpression
  | account_creation_expression  # AccountCreationExpression
  | mod_expression  # ModExpression
  | vip_expression  # VipExpression
  | chat_expression  # ChatExpression
  | chat_length_expression  # ChatLengthExpression
  | content_length_expression  # ContentLengthExpression
  | emote_only_expression  # EmoteOnlyExpression
  | jamo_only_expression  # JamoOnlyExpression
  
  // All other custom expressions
  | custom_expression  # CustomExpression
;

username_expression : 'username' parameters;

follow_expression : 'follow' parameters;

sub_expression
  : 'goodocja'
  | 'bgoodocja'
  | 'goodoc' parameters
;

account_creation_expression : 'account' parameters;

mod_expression : 'mod';

vip_expression : 'vip';

chat_expression : 'chat' parameters;

chat_length_expression : 'chatlen' parameters;

content_length_expression : 'contentlen' parameters;

emote_only_expression : 'emote-only';

jamo_only_expression : 'jamo-only';

custom_expression : WORD WORD*;

parameters : WORD+;



NUMBER : [0-9]+;
LPAREN : '(';
RPAREN : ')';
AND : '&';
OR : '|';
NOT : '!';
WORD : [a-zA-Z0-9'"]+;
WHITESPACE : [ \t\r\n]+ -> skip;
UNICODE: [\uAC00-\uD7A3];