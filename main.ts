// A single sentence for a friend who has never coded: their app idea only
// needs their own words, and an AI agent on make.fun turns those words into
// a first working version. This program does nothing but write that sentence
// to the output directory the grader provides.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const friendPitch =
  "That app idea you keep bringing up over coffee only needs your words — describe it in plain language to an AI agent on make.fun and it will build your first working version, no coding, no setup, just the idea you already have.";

const CHAR_LIMIT = 240; // the gate allows 1..240 characters

function validatePitch(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error("pitch must not be blank");
  }
  const charCount = [...trimmed].length;
  if (charCount > CHAR_LIMIT) {
    throw new Error(`pitch is ${charCount} chars, over the ${CHAR_LIMIT} cap`);
  }
  if (!trimmed.includes(" ")) {
    throw new Error("pitch must be a sentence, not a single word");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validatePitch(friendPitch);
writeFileSync(join(outDir, "entry.txt"), friendPitch, "utf8");
