# Live Vacation Updates

Use this when the family locks in a decision and you want the live trip site updated quickly.

## Best path with Codex or Claude Code

Paste something like this:

```text
Update the TCI trip site: [describe the decision]. Keep the copy concise, run npm run build, then run npm run deploy:live -- "[short commit message]".
```

Examples:

```text
Update the TCI trip site: Thursday dinner is Sweet T's takeout after the snorkel boat. Keep the copy concise, run npm run build, then run npm run deploy:live -- "Set Thursday dinner"
```

```text
Update the TCI trip site: Move Almond Tree to backup and make Castaways the Saturday dinner. Keep the copy concise, run npm run build, then run npm run deploy:live -- "Update Saturday dinner"
```

## Manual command

From the repo in WSL:

```bash
npm run deploy:live -- "Update trip plan"
```

That command:

1. Builds the site.
2. Commits tracked source edits to `main`.
3. Pushes `main`.
4. Publishes the built `dist/` output to `gh-pages`.
5. Updates `https://keybridgemike.github.io/tci-trip/`.

Note: it only auto-commits tracked files. If you add a brand-new source file, run `git add <file>` first or ask Codex/Claude to stage the new file explicitly.
