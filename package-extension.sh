#!/bin/bash

# Package the Genius Prompt Enhancer extension for Chrome Web Store submission

echo "🚀 Packaging Genius Prompt Enhancer for Chrome Web Store..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "⚠️ Warning: .env file not found. Using .env.example instead."
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example. Please update with your actual API key."
  else
    echo "❌ Error: Neither .env nor .env.example found. Please create a .env file with your API key."
    exit 1
  fi
fi

# Build the extension
echo "📦 Building extension..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "❌ Build failed. Aborting packaging."
  exit 1
fi

# Create the zip file
echo "🗜️ Creating ZIP file..."
cd dist
zip -r ../genius-prompt-enhancer.zip *
cd ..

# Check if zip was successful
if [ $? -ne 0 ]; then
  echo "❌ ZIP creation failed."
  exit 1
fi

# Calculate file size
SIZE=$(du -h genius-prompt-enhancer.zip | cut -f1)

echo "✅ Packaging complete!"
echo "📁 Output: genius-prompt-enhancer.zip ($SIZE)"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Sign in with your Google account"
echo "3. Click 'New Item' and upload the ZIP file"
echo "4. Fill in the required information and submit for review"
echo ""
echo "See README.md for detailed instructions."
