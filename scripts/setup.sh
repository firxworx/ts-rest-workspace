#!/usr/bin/env bash

set -euo pipefail

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$(dirname "$SCRIPT_PATH")"
GIT_REPO_ROOT="$(git rev-parse --show-toplevel)"

# function that creates an .env file based on a .env.sample if it does not exist at the given path
create_env_file() {
  local env_sample_path="$GIT_REPO_ROOT/$1/.env.sample"
  local env_path="$GIT_REPO_ROOT/$1/.env"

  if [ ! -f "$env_path" ]; then
    if [ -f "$env_sample_path" ]; then
      cp "$env_sample_path" "$env_path"
      echo "Created $env_path from $1/.env.sample"
    else
      echo "Sample .env file $env_sample_path does not exist."
    fi
  else
    echo "$env_path already exists... Skipping."
  fi
}

# create .env files for apps/ui and apps/fastify-api
create_env_file "apps/ui"
create_env_file "apps/fastify-api"

# ensure pnpm is installed otherwise exit with error message to stderr
if ! command -v pnpm &> /dev/null; then
  echo "pnpm could not be found. Please install pnpm to continue: https://pnpm.io/installation" >&2
  exit 1
fi

# install dependencies for the workspace
echo "Installing dependencies..."
pnpm install
