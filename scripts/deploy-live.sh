#!/usr/bin/env bash
set -euo pipefail

message="${1:-Update trip plan}"
repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

echo "Building site..."
npm run build

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Committing tracked source changes..."
  git add -u
  if ! git diff --cached --quiet; then
    git commit -m "$message"
    git push origin main
  else
    echo "No tracked source changes to commit."
  fi
else
  echo "No source changes to commit."
fi

deploy_dir="$(mktemp -d)"
cleanup() {
  git worktree remove --force "$deploy_dir" >/dev/null 2>&1 || rm -rf "$deploy_dir"
}
trap cleanup EXIT

echo "Preparing gh-pages worktree..."
git fetch origin gh-pages
git worktree add -B gh-pages "$deploy_dir" origin/gh-pages

find "$deploy_dir" -mindepth 1 -maxdepth 1 ! -name ".git" -exec rm -rf {} +
cp -a dist/. "$deploy_dir"/
touch "$deploy_dir/.nojekyll"

echo "Publishing built site..."
git -C "$deploy_dir" add -A
if git -C "$deploy_dir" diff --cached --quiet; then
  echo "Live site already matches this build."
else
  git -C "$deploy_dir" commit -m "Deploy: $message"
  git -C "$deploy_dir" push origin gh-pages
fi

echo "Done: https://keybridgemike.github.io/tci-trip/"
