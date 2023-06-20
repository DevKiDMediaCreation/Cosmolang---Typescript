import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_BOOL, MK_NULL, MK_NUMBER } from "./runtime/values.ts";

repl();

function repl() {
  const parser = new Parser();
  const env = new Environment();
  env.declareVar("x", MK_NUMBER(100));
  env.declareVar("true", MK_BOOL(true));
  env.declareVar("false", MK_BOOL(true));
  env.declareVar("null", MK_NULL());
  env.declareVar("on", MK_BOOL(true));
  env.declareVar("off", MK_BOOL(true));
  console.log("\nRepl v0.1 Comso Lingua / Cosmolang / Cosmos");
  while (true) {
    const input = prompt("CLT+~?>");
    // Check for no user input or exit keyword
    if (!input || input.includes("exit")) {
      Deno.exit(1);
    }

    // Produce AST from souce-code
    const program = parser.produceAST(input);
    // console.log(program);

    const result = evaluate(program, env);
    console.log(result);
  }
}

// let x = 45
// let foo = null

// x = 45 + foo // null
