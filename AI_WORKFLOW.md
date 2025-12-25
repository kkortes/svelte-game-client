# AI Parallel Development Workflow

This document explains how the AI-assisted parallel development workflow works in this repository.

## Overview

This repository contains two parallel versions of the game:
- **Main Directory** (`./*`) - Your production code where you develop
- **AI Version** (`./ai-version/`) - An independent copy where AI (Claude Code) experiments and implements features

## The Workflow

### 1. Your Development
You continue working in the main directory as normal:
- Make changes to any files
- Commit and push as usual
- Your work is never affected by AI experiments

### 2. AI Development
Claude Code works independently in the `ai-version/` directory:
- Experiments with new game mechanics
- Improves code architecture and patterns
- Implements features you request
- Fixes bugs and addresses technical debt
- Documents changes in `ai-version/AI_CHANGELOG.md`

### 3. Syncing Changes
When you want to sync your changes to the AI version, simply say:
```
"Sync my changes to ai-version"
```

Claude will:
1. Identify files you've changed in the main directory
2. Copy those changes to `ai-version/`
3. Resolve any conflicts if needed
4. Document the sync in the changelog

### 4. Reviewing AI Changes
To see what the AI has been working on:

**View the changelog:**
```bash
cat ai-version/AI_CHANGELOG.md
```

**Compare specific files:**
```bash
# Using diff
diff ./src/app.svelte.ts ./ai-version/src/app.svelte.ts

# Using git (even though they're in the same repo)
git diff --no-index ./src/app.svelte.ts ./ai-version/src/app.svelte.ts
```

**Compare entire directories:**
```bash
# Visual diff tool (if you have one)
code --diff ./src/components ./ai-version/src/components

# Or use your IDE's folder comparison feature
```

### 5. Adopting AI Changes
When you find something you like in the AI version:

**Manual copy (recommended):**
```bash
# Copy a specific file
cp ai-version/src/components/NewFeature.svelte src/components/

# Or selectively copy code snippets using your editor
```

**Review and cherry-pick:**
- Read the AI's implementation in `ai-version/`
- Take inspiration or copy specific parts
- Adapt to your coding style
- You have full control over what gets into your production code

## Requesting Features

### New Features
```
"In ai-version, implement a card trading system where players can exchange cards"
```

### Experiments
```
"Experiment with a turn-based combat system in ai-version"
```

### Improvements
```
"Refactor the WebSocket connection handling in ai-version to be more robust"
```

### Bug Fixes
```
"Fix the memory leak in the notification system in ai-version"
```

## Directory Structure

```
svelte-game-client/
├── src/                          # Your production code
├── static/                       # Your assets
├── svelte-game-server/          # Your backend
├── ai-version/                   # AI's parallel version
│   ├── src/                      # AI's version of frontend
│   ├── static/                   # AI's version of assets
│   ├── svelte-game-server/      # AI's version of backend
│   └── AI_CHANGELOG.md          # What the AI has changed
├── AI_WORKFLOW.md               # This file
└── CLAUDE.md                     # Repository guidance
```

## What's Tracked in Git

The AI version is **fully tracked** in your git repository:
- You can see the AI's changes in commits
- You can review diffs before committing
- You can revert AI changes if needed
- The history is preserved

However, build artifacts are **not tracked**:
- `ai-version/node_modules/` (excluded in .gitignore)
- `ai-version/.svelte-kit/` (excluded in .gitignore)
- `ai-version/.env` files (excluded in .gitignore)

## Benefits

✅ **Safe Experimentation** - AI can break things without affecting your code
✅ **Easy Comparison** - See exactly what's different
✅ **Selective Adoption** - Take only what you want
✅ **Full Visibility** - All changes are tracked and visible
✅ **No Merge Conflicts** - You manually control what gets adopted
✅ **Learning Resource** - See different approaches to solve problems

## Tips

1. **Regular Syncs**: Sync your changes periodically to keep the AI version up to date
2. **Review Often**: Check the AI changelog regularly to see experiments
3. **Be Specific**: When requesting features, be clear about what you want
4. **Test First**: The AI version is experimental - always test before adopting
5. **Ask Questions**: Ask the AI to explain why it made certain choices

## Examples

### Example 1: Request a New Feature
```
You: "In ai-version, add a deck builder where players can create custom
     decks with a maximum of 30 cards"

Claude: [Implements the feature in ai-version/]
        [Updates AI_CHANGELOG.md with details]

You: [Review the implementation]
     [Decide to adopt the UI components but modify the logic]
```

### Example 2: Sync Your Changes
```
You: "I just updated the Card component to include rarity.
     Sync this to ai-version"

Claude: [Copies your Card.svelte changes to ai-version/]
        [Logs the sync in the changelog]
```

### Example 3: Compare Implementations
```
You: "Show me the difference between my authentication flow
     and your version"

Claude: [Shows git diff of relevant auth files]
        [Explains key differences]
```

## Getting Started

The AI version is already set up and ready to use. Just start requesting features or improvements, and Claude will work in the `ai-version/` directory.

To get the AI version running locally (if you want to test it):
```bash
cd ai-version
bun install
bun dev  # Runs on a different port than your main version
```

## Questions?

Ask Claude Code:
- "How does the AI workflow work?"
- "What have you changed in ai-version recently?"
- "Sync my latest changes to ai-version"
- "In ai-version, add [feature description]"
