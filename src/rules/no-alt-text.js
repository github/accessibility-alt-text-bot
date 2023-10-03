import { lintRule } from "unified-lint-rule";
import { visit } from "unist-util-visit";
import { generated } from "unist-util-generated";

const MacOsScreenshotRegex =
  /(Clean|Screen) ?[S|s]hot [0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-9][0-9].*/;

const isBadAltText = (alt) => {
  // Empty or undefined alt text
  if (alt === "" || alt === undefined) {
    return true;
  }
  // if Alt text is "Image" or "image"
  if (alt === "Image" || alt === "image") {
    return true;
  }
  // if Alt text starts with "Clean" or "Screen"
  if (alt.match(MacOsScreenshotRegex)) {
    return true;
  }

  return false;
};

//TODO: Improve output message and use it in the alt-text-bot comment
export const noAltText = lintRule(
  {
    origin: "accessibility-alt-text-bot:no-alt-text",
  },
  (tree, file) => {
    visit(tree, "image", (node) => {
      if (!generated(node) && isBadAltText(node.alt)) {
        file.message(`Detected bad alt text: ${node.alt}`, node);
      }
    });
    visit(tree, "html", (node) => {
      if (node.value.startsWith("<img")) {
        const alt = node.value
          .match(/alt=("|')([^"|']*)("|')/g)?.[0]
          ?.split("=")[1]
          ?.slice(1, -1);
        if (!generated(node) && isBadAltText(alt)) {
          file.message(`Detected bad alt text: ${alt}`, node);
        }
      }
    });
  }
);
