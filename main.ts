// u-suroto-two-sentence-horror-acea9253 — entry program: writes the two-sentence horror story to /output/entry.txt
// The guards below mirror the bounty gate (1-400 chars, exactly two sentences)
// so an invalid entry fails loudly here instead of failing silently on the server.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Every morning at six, the house warms my coffee, opens the blinds, and greets me by name, exactly like it always has. I moved in three days ago, and I have never once told it my name.";

if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must not contain a newline");
}
if (ENTRY.length < 1 || ENTRY.length > 400) {
  throw new Error(`entry length ${ENTRY.length} is outside 1-400 characters`);
}
const sentenceCount =
  (ENTRY.match(/\. /g) || []).length + (ENTRY.endsWith(".") ? 1 : 0);
if (sentenceCount !== 2) {
  throw new Error(`entry must be exactly two sentences, counted ${sentenceCount}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
