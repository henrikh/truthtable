start
 = space* group:group space* {return group}

group
 = f:paren op:operator s:group {return [op, "(", f, ",", s, ")"].join("")}
 / paren

paren
 = "(" space* group:group space* ")" {return "(" + group + ")"}
 / "!" paren:paren {return "!" + paren}
 / not paren:paren {return "!" + paren}
 / symset

operator
 = and          {return "and"}
 / or           {return "or"}
 / s+ "nor"  s+ {return "nor"}
 / s+ "NOR"  s+ {return "nor"}
 / s+ "nand" s+ {return "nand"}
 / s+ "NAND" s+ {return "nand"}
 / s+ "xor"  s+ {return "xor"}
 / s+ "XOR"  s+ {return "xor"}
 / s+ "xnor" s+ {return "xnor"}
 / s+ "XNOR" s+ {return "xnor"}

and
 = s+ "and"  s+
 / s+ "AND"  s+
 / s* "&&"   s*
 / s* "&"    s*
 / s* "*"    s*

or
 = s+ "or"   s+
 / s+ "OR"   s+
 / s* "||"   s*
 / s* "|"    s*
 / s* "+"    s*

symset
 = sym:symbol symset:symset {return sym + "&&" + symset}
 / symbol

symbol
 = not "(" space* sym:symbol space* ")" {return "(!" + sym + ")"}
 / "(" not space+ sym:symbol ")" {return "(!" + sym + ")"}
 / "!" sym:symbol {return "(!" + sym + ")"}
 / [a-zA-Z]

not
 = "not"
 / "NOT"

s
 = space

space
 = " "