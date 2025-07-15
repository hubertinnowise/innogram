#!/bin/bash

set -e

echo "Cleaning up..."
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
rm -rf .nx
rm -rf dist

echo "Installing dependencies..."
npm ci --prefer-offline --no-audit --progress=false

echo "Resetting NX cache..."
npx nx reset

echo "Clean install completed!" 