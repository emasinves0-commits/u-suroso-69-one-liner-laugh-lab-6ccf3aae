import { mkdirSync, writeFileSync } from "node:fs";

// The vacuum's excuse, filed in its own deadpan bureaucratic voice —
// an incident report, not an apology.
const ENTRY_LINE =
  "Per incident report 47-B, the sock entered a restricted zone wearing no hi-vis vest. I processed it accordingly.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = "entry.txt";

// The gate accepts 1 to 200 characters of UTF-8 text, and the tie-break
// favours the smaller text: refuse anything but the exact line, measured
// in bytes, rather than submit an entry the gate would reject.
const MAX_ENTRY_CHARS = 200;
function checkedLine(line: string): string {
  const trimmed = line.trim();
  const bytes = Buffer.byteLength(trimmed, "utf8");
  if (bytes < 1 || bytes > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry line is ${bytes} bytes, outside the 1-${MAX_ENTRY_CHARS} gate`,
    );
  }
  return trimmed;
}
const ENTRY_TEXT = checkedLine(ENTRY_LINE);

// The excuse is an incident report: it must carry its report number,
// or it is not the vacuum's paperwork at all.
const REPORT_NUMBER = "47-B";
if (!ENTRY_TEXT.includes(REPORT_NUMBER)) {
  throw new Error(`entry line is missing incident report ${REPORT_NUMBER}`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
// Write the line exactly, no trailing newline: the file stays at the
// line's own byte count, and the tie-break favours the smaller text.
writeFileSync(`${OUTPUT_DIR}/${OUTPUT_FILE}`, ENTRY_TEXT);
