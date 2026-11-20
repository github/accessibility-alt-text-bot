import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, test } from "vitest";

const queriesPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "queries.sh",
);

const runShell = (body) => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "accessibility-alt-text-bot-"),
  );
  const summaryPath = join(temporaryDirectory, "summary.md");

  try {
    const result = spawnSync(
      "bash",
      [
        "-c",
        `set -e -o pipefail\nsource "$1"\n${body}`,
        "queries-test",
        queriesPath,
      ],
      {
        encoding: "utf8",
        env: {
          ...process.env,
          GITHUB_STEP_SUMMARY: summaryPath,
          TEST_MESSAGE: "Complete fallback message\nwith a second line.",
        },
      },
    );

    return {
      result,
      summary: existsSync(summaryPath)
        ? readFileSync(summaryPath, "utf8")
        : undefined,
    };
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true });
  }
};

describe("postCommentWithFallback", () => {
  test("preserves successful command output without a fallback", () => {
    const { result, summary } = runShell(`
      postCommentWithFallback "$TEST_MESSAGE" bash -c \
        'printf "%s\\n" "$1"' comment-command "$TEST_MESSAGE"
    `);

    expect(result.status).toBe(0);
    expect(result.stdout).toBe("Complete fallback message\nwith a second line.\n");
    expect(result.stderr).toBe("");
    expect(summary).toBeUndefined();
  });

  test("reports the full message when fork permissions prevent a comment", () => {
    const { result, summary } = runShell(`
      postCommentWithFallback "$TEST_MESSAGE" bash -c \
        'printf "GraphQL: Resource not accessible by integration (addComment)\\n" >&2; exit 1'
    `);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "::warning::Unable to post the accessibility alt text comment",
    );
    expect(result.stdout).toContain("Complete fallback message\nwith a second line.");
    expect(result.stderr).toBe("");
    expect(summary).toContain("# Accessibility alt text bot");
    expect(summary).toContain("Complete fallback message\nwith a second line.");
  });

  test("preserves unexpected failures", () => {
    const { result, summary } = runShell(`
      postCommentWithFallback "$TEST_MESSAGE" bash -c \
        'printf "unexpected API failure\\n" >&2; exit 23'
    `);

    expect(result.status).toBe(23);
    expect(result.stdout).toBe("");
    expect(result.stderr).toBe("unexpected API failure\n");
    expect(summary).toBeUndefined();
  });
});

describe("addDiscussionComment", () => {
  test("uses its explicit arguments for a top-level comment", () => {
    const { result } = runShell(`
      discussion_node_id="global-id"
      message="global message"
      gh() { printf '<%s>\\n' "$@"; }

      addDiscussionComment "argument-id" "$TEST_MESSAGE"
    `);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("<discussionId=argument-id>");
    expect(result.stdout).toContain(
      "<body=Complete fallback message\nwith a second line.>",
    );
    expect(result.stdout).not.toContain("global-id");
    expect(result.stdout).not.toContain("global message");
  });
});
