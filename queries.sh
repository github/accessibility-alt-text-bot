#!/bin/bash

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
      mutation($discussionId: ID!, , $replyToId: ID, $body: String!) {
          addDiscussionComment(input: {discussionId: $discussionId, replyToId: $replyToId, body: $body}) {
          comment {
              id
          }
        }
      }
    '
  else
    gh api graphql -F discussionId="$discussion_node_id" -F body="$message" -f query='
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
