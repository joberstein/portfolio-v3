#!/usr/bin/env sh

HOOKS_DIR="$(pwd)/hooks"

git config core.hooksPath $HOOKS_DIR && echo "Set local hooks path to: $HOOKS_DIR"
