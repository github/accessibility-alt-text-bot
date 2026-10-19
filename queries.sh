#!/bin/bash

# Runs a comment command and falls back to the log and job summary when a fork token cannot write comments.
function postCommentWithFallback() {
  local MESSAGE=$1
  shift

  local OUTPUT
  local EXIT_CODE

  if OUTPUT=$("$@" 2>&1); then
    if [ -n "$OUTPUT" ]; then
      printf '%s\n' "$OUTPUT"
    fi
    return 0
  else
    EXIT_CODE=$?
  fi

  if [[ "$OUTPUT" == *"Resource not accessible by integration"* ]]; then
    printf '%s\n' "::warning::Unable to post the accessibility alt text comment because the workflow token cannot write comments. The message is included below and in the job summary."
    printf '\n%s\n' "$MESSAGE"

    if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
      {
        printf '# Accessibility alt text bot\n\n'
        printf '%s\n' "$MESSAGE"
      } >> "$GITHUB_STEP_SUMMARY"
    fi

    return 0
  fi

  if [ -n "$OUTPUT" ]; then
    printf '%s\n' "$OUTPUT" >&2
  fi
  return "$EXIT_CODE"
}

# Given a node_id for a discussion comment that is a reply in thread, return the parent comment's node ID.
function getDiscussionReplyToId() {
  local NODE_ID=$1
  local REPLY_TO_DATA=$(gh api graphql -f query='
  query($nodeId: ID!) {
    node(id: $nodeId) {
      ... on DiscussionComment {
        replyTo {
          id
        }
      }
    }
  }' -F nodeId=$NODE_ID)
  echo $REPLY_TO_DATA | jq -r '.data.node.replyTo.id'
}

# Given a discussion node ID, a message, and an optional reply to node ID, adds a discussion comment.
function addDiscussionComment() {
  local DISCUSSION_NODE_ID=$1
  local MESSAGE=$2
  local REPLY_TO_ID=$3

  if [ -n "$REPLY_TO_ID" ]; then
    gh api graphql -F discussionId="$DISCUSSION_NODE_ID" -F replyToId="$REPLY_TO_ID" -F body="$MESSAGE" -f query='
      mutation($discussionId: ID!, $replyToId: ID, $body: String!) {
          addDiscussionComment(input: {discussionId: $discussionId, replyToId: $replyToId, body: $body}) {
          comment {
              id
          }
        }
      }
    '
  else
    gh api graphql -F discussionId="$DISCUSSION_NODE_ID" -F body="$MESSAGE" -f query='
      mutation($discussionId: ID!, $body: String!) {
        addDiscussionComment(input: {discussionId: $discussionId, body: $body}) {
          comment {
            id
          }
        }
      }
    '
  fi
}
