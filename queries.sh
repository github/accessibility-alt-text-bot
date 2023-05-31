#!/bin/bash

# Given a node_id for a Discussion Comment with a parent comment, return the parent comment's node ID.
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

# Adds a top-level discussion comment given a discussion node ID and a message.
function addDiscussionComment() {
  local DISCUSSION_NODE_ID=$1
  local MESSAGE=$2
  gh api graphql -F discussionId="$discussion_node_id" -F body="$message" -f query='
    mutation($discussionId: ID!, $body: String!) {
      addDiscussionComment(input: {discussionId: $discussionId, body: $body}) {
        comment {
          id
        }
      }
    }
  '
}

# Adds a Discussion Comment as a reply to an existing discussion comment given a discussion node ID, discussion comment node ID, and a message.
function addDiscussionCommentAsReply() {
  local DISCUSSION_NODE_ID=$1
  local REPLY_TO_ID=$2
  local MESSAGE=$3
  gh api graphql -F discussionId="$DISCUSSION_NODE_ID" -F replyToId="$REPLY_TO_ID" -F body="$MESSAGE" -f query='
    mutation($discussionId: ID!, , $replyToId: ID, $body: String!) {
        addDiscussionComment(input: {discussionId: $discussionId, replyToId: $replyToId, body: $body}) {
        comment {
            id
        }
      }
    }
  '
}
