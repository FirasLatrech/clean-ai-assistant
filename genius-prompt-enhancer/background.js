// Background script for Genius Prompt Enhancer Chrome Extension

// Handle installation and updates
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
        console.log("Genius Prompt Enhancer installed successfully");
        // Set default settings on install
        chrome.storage.local.set({
            advancedMode: false,
            creativity: 0.7,
            promptHistory: [],
        });

        // Open onboarding page on install
        chrome.tabs.create({
            url: "index.html?onboarding=true",
        });
    } else if (details.reason === "update") {
        console.log(
            "Genius Prompt Enhancer updated to version " +
                chrome.runtime.getManifest().version
        );
    }
});

// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSettings") {
        chrome.storage.local.get(["advancedMode", "creativity"], (result) => {
            sendResponse(result);
        });
        return true; // Required for async sendResponse
    }
});

// Context menu integration (for future enhancement)
// chrome.contextMenus.create({
//   id: 'enhanceSelectedText',
//   title: 'Enhance with Genius Prompt Enhancer',
//   contexts: ['selection']
// });
//
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === 'enhanceSelectedText') {
//     chrome.tabs.sendMessage(tab.id, {
//       action: 'enhanceText',
//       text: info.selectionText
//     });
//   }
// });
