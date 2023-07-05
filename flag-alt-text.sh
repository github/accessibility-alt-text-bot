#!/bin/bash

flagAltText() {
    markdownMacOsScreenshotRegex="^.*!\[(Clean|Screen) ?[S|s]hot [0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-9][0-9].*\].*$"
    semanticMacOsScreenshotRegex="^.*<img.*(Clean|Screen) ?[S|s]hot [0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-9][0-9].*$"
    markdownImageRegex="^.*!\[(i|I)mage\].*$"
    semanticImageRegexStartingWithImage="^.*<img.*alt=\"(i|I)mage\".*$"
    emptySemanticRegex="^.*<img.*alt=(\"|')(\"|').*$"
    emptyMarkdownRegex="^.*!\[\].*$"
    semanticImageRegex="^.*<img.*$"
    semanticImageWithAltRegex="^.*<img.*alt=.*$"

    if [[ ($1 =~ $semanticImageRegex) && ! ($1 =~ $semanticImageWithAltRegex) ]] || [[ $1 =~ $semanticMacOsScreenshotRegex ]] || [[ $1 =~ $markdownMacOsScreenshotRegex ]] || [[ $1 =~ $semanticImageRegexStartingWithImage ]] || [[ $1 =~ $markdownImageRegex ]] || [[ $1 =~ $emptySemanticRegex ]] || [[ $1 =~ $emptyMarkdownRegex ]]; then
        echo true
    else
        echo false
    fi
}
