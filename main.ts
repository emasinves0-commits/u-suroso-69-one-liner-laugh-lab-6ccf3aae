import { mkdirSync, writeFileSync } from "node:fs";

// The vacuum's excuse, in its own deadpan voice.
const ENTRY_LINE =
  "Per incident report 47-B, the sock entered a restricted zone wearing no hi-vis vest. I processed it accordingly.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = "entry.txt";

// The gate accepts 1 to 200 characters of UTF-8 text; refuse to write an
// out-of-range line rather than submit an entry the gate would reject.
const MAX_ENTRY_CHARS = 200;
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > MAX_ENTRY_CHARS) {
  throw new Error(
    `entry line is ${ENTRY_LINE.length} characters, outside the 1-${MAX_ENTRY_CHARS} gate`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
// Write the line exactly: no trailing newline, so the file stays at the
// line's own byte count (the tie-break favours the smaller text).
writeFileSync(`${OUTPUT_DIR}/${OUTPUT_FILE}`, ENTRY_LINE.trim());
