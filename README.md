
# Prompt Enhancer Chrome Extension

A beautiful Chrome extension that enhances your prompts using Claude AI.

## Features

- Clean, minimalist UI inspired by modern design principles
- Enhance prompts with Claude AI
- Adjust creativity level with a slider
- Advanced mode for more detailed enhancements
- Copy enhanced prompts to clipboard
- Smooth animations and transitions

## Installation

### Development Mode

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the extension
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" in the top right corner
6. Click "Load unpacked" and select the `dist` folder from this project
7. The extension should now be installed and visible in your Chrome toolbar

### Production Mode

1. Build the extension as described above
2. Package the `dist` folder as a ZIP file
3. Submit to the Chrome Web Store for review

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter the prompt you want to enhance in the text area
3. Adjust the creativity level using the slider (optional)
4. Toggle advanced mode for more detailed enhancements (optional)
5. Click "Enhance Prompt" to generate an enhanced version
6. Copy the enhanced prompt to your clipboard with the "Copy" button

## Development

This project uses:
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Claude AI API

To start development:

```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

The built extension will be in the `dist` folder.

## Notes

- This extension requires an internet connection to work
- API calls to Claude AI are made directly from the extension
- The extension requires the "clipboardWrite" permission to copy enhanced prompts to your clipboard
