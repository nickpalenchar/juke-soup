#!/bin/bash

LATEST_TAG="$(git tag -l 'v-*' | awk -F'-' '{print $2}' | sort -nr | head -n 1)"
NEXT_TAG="$(( LATEST_TAG + 1 ))"

git commit -m "Build publish"
