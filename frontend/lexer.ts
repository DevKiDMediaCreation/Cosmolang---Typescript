// Let x = 45 + ( foo * bar )
// [ LetToken, IdentifierTk, EqualsToken, NumberToken ]

export enum TokenType {
    // Literal Types
    Null,
    Number,
    Identifier,

    // Keywords
    Let,

    // Grouping * Operators
    BinaryOperator,
    Equals,
    OpenParen,
    CloseParen,
    EOF, // Signified the end of file
}

/**
 *  Constant lookup for keywords and known identifier + symbols.
 */
const KEYWORDS: Record<string, TokenType> = {
    let: TokenType.Let,
    null: TokenType.Null,
};

export interface Token {	
    value: string; // contains the raw value as seen inside the source code.	
    type: TokenType; // tagged structure.	
}

// Returns a token of a given type and value	
function token(value = "", type: TokenType): Token {	
    return { value, type };	
}

function isalpha(src: string) {	
    return src.toUpperCase() != src.toLowerCase();	
}

function isint(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1])
}

function isskippable(str: string) {	
    return str == " " || str == "\n" || str == "\t";	
}

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    // Build each token until end of file
    while (src.length > 0) {
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%" || src[0] == "?") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == "=") {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            // Handle multicharater tokens

            // Build number token
            if (isint(src[0])) {
                let num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(src[0])) {
                let ident = "";
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }

                // Chceck for reserved keywords
                const reserved = KEYWORDS[ident];
                if (typeof reserved == "number") {
                    tokens.push(token(ident, reserved));
                } else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
            } else if (isskippable(src[0])) {
                src.shift(); // SKIP THE CURRENT CHARACTER
            } else {
                console.log("Unreconized character found in source: ", src[0].charCodeAt(0), src[0]);
                Deno.exit(1);
            }
        }
    }
    tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
    return tokens
}

/*const source = await Deno.readTextFile("./hello.cos")
for (const token of tokenize(source)) {
    console.log(token);
}*/