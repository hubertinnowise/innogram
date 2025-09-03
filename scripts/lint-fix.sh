#!/bin/bash

echo "🔧 Running lint autofix..."

# Format code with prettier
echo "📝 Formatting code..."
pnpm nx format:write --all

# Fix ESLint issues
echo "🔍 Fixing ESLint issues..."
pnpm nx run-many --all --target=lint --fix

# Check if there are any remaining errors
echo "✅ Running final check..."
if pnpm nx run-many --all --target=lint --quiet; then
    echo "✨ All linting issues have been fixed!"
else
    echo "⚠️  Some issues remain that need manual fixing:"
    pnpm nx run-many --all --target=lint
fi