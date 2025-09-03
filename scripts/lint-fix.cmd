@echo off
echo 🔧 Running lint autofix...

echo 📝 Formatting code...
pnpm nx format:write --all

echo 🔍 Fixing ESLint issues...
pnpm nx run-many --all --target=lint --fix

echo ✅ Running final check...
pnpm nx run-many --all --target=lint --quiet
if %errorlevel% equ 0 (
    echo ✨ All linting issues have been fixed!
) else (
    echo ⚠️  Some issues remain that need manual fixing:
    pnpm nx run-many --all --target=lint
)