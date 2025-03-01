# Chrome Web Store Publishing Checklist

Use this checklist to ensure you've completed all necessary steps before submitting your Genius Prompt Enhancer to the Chrome Web Store.

## Preparation

- [ ] Update the extension name, description, and version in `public/manifest.json`
- [ ] Create proper icons (16px, 48px, 128px) in the `public/icons` directory
- [ ] Set up environment variables in `.env` file (copy from `.env.example`)
- [ ] Ensure API key is properly secured and not hardcoded
- [ ] Test the extension thoroughly in different scenarios
- [ ] Ensure all features work as expected
- [ ] Check for any hardcoded values or security issues

## Build and Package

- [ ] Run `npm run build` to create a production build
- [ ] Run `./package-extension.sh` to create the ZIP file
- [ ] Verify the ZIP file contains all necessary files
- [ ] Test the packaged extension by loading it in Chrome

## Chrome Web Store Developer Account

- [ ] Create a [Chrome Web Store Developer account](https://chrome.google.com/webstore/devconsole)
- [ ] Pay the one-time $5 registration fee (if not already done)

## Prepare Submission Materials

- [ ] Take screenshots of the extension (see SCREENSHOTS.md)
- [ ] Create promotional images (optional)
- [ ] Finalize the privacy policy (update PRIVACY_POLICY.md)
- [ ] Write a detailed description for the store listing
- [ ] Prepare a support email address or website

## Submission

- [ ] Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [ ] Click "New Item" and upload your ZIP file
- [ ] Fill in all required fields:
  - [ ] Name: Genius Prompt Enhancer
  - [ ] Description (detailed and brief)
  - [ ] Category: Productivity
  - [ ] Language
  - [ ] Screenshots (at least one)
  - [ ] Promotional images (optional)
  - [ ] Privacy policy URL or text
  - [ ] Website URL (optional)
  - [ ] Support URL or email
- [ ] Set visibility options (public or unlisted)
- [ ] Submit for review

## After Submission

- [ ] Monitor your developer email for messages from the Chrome Web Store team
- [ ] Be prepared to make changes if requested
- [ ] Once approved, share the extension with users
- [ ] Collect feedback for future improvements

## Future Updates

- [ ] Increment the version number in `public/manifest.json`
- [ ] Make your code changes
- [ ] Build and package the extension
- [ ] Upload the new package to the Developer Dashboard
- [ ] Submit for review

## Notes

- The review process typically takes a few business days
- Extensions that request sensitive permissions may take longer to review
- Keep your privacy policy and description up to date with any changes to functionality
