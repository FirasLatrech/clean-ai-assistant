# Genius Prompt Enhancer

A Chrome extension that transforms your prompts into genius-level writing with AI assistance.

## Features

- Enhance prompts for different contexts (creative, technical, business, educational)
- Adjustable creativity settings
- Advanced mode for more detailed enhancements
- Conversation history
- Copy-to-clipboard functionality
- Template-based prompt suggestions

## Development

This project is built with:
- React
- TypeScript
- Vite
- ShadCN UI
- TailwindCSS

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace the placeholder with your actual Claude API key
   ```
   cp .env.example .env
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Building for Production

To build the extension for production:

```
npm run build
```

This will create a `dist` directory with the built extension.

## Publishing to Chrome Web Store

Follow these steps to publish your extension to the Chrome Web Store:

### 1. Prepare Your Extension

1. Create proper icons for your extension:
   - icon-16.png (16x16 pixels)
   - icon-48.png (48x48 pixels)
   - icon-128.png (128x128 pixels)

   Place these in the `public/icons` directory.

2. Build your extension:
   ```
   npm run build
   ```

3. Create a ZIP file of the `dist` directory:
   ```
   cd dist
   zip -r ../genius-prompt-enhancer.zip *
   ```

### 2. Create a Developer Account

1. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Sign in with your Google account
3. Pay the one-time developer registration fee ($5)

### 3. Submit Your Extension

1. Click "New Item" in the Developer Dashboard
2. Upload your ZIP file
3. Fill in the required information:
   - Name: Genius Prompt Enhancer
   - Description: Transform your prompts into genius-level writing with AI assistance
   - Category: Productivity
   - Language: English
   - Screenshots: Add at least one screenshot of your extension in action
   - Promotional images (optional)
   - Privacy policy URL (required if you collect user data)

4. Submit for review

### 4. Wait for Approval

The review process typically takes a few business days. You'll receive an email when your extension is approved or if there are issues to address.

### 5. Updates

To update your extension:
1. Make your changes
2. Increment the version number in `public/manifest.json`
3. Build and create a new ZIP file
4. Upload the new ZIP in the Developer Dashboard

## Security Considerations

- The extension uses environment variables for API keys, improving security
- API keys are included in the build but not hardcoded in the source code
- For a production version with real API calls, you should:
  1. Use a backend service for API calls to avoid exposing keys in the client
  2. Implement proper authentication and authorization
  3. Add rate limiting to prevent abuse
  4. Consider using a proxy service to handle API requests

## Environment Variables

The following environment variables are used in this project:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CLAUDE_API_KEY` | Your Claude API key | Yes |

To set up environment variables:
1. Copy `.env.example` to `.env`
2. Replace the placeholder values with your actual API keys
3. The `.env` file is ignored by git to prevent accidental exposure of sensitive information

## License

MIT

## Author

Created by Firas Latrach
