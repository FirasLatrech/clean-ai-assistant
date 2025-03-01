
// Claude API key
const CLAUDE_API_KEY = "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";

export interface EnhancePromptOptions {
  prompt: string;
  temperature?: number;
  advancedMode?: boolean;
}

export async function enhancePromptWithClaude({
  prompt,
  temperature = 0.7,
  advancedMode = false,
}: EnhancePromptOptions): Promise<string> {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-3-haiku-20240307",
        max_tokens: 1024,
        temperature: temperature,
        messages: [
          {
            role: "user",
            content: `Improve this prompt to be more effective, specific, and clear. Make it detailed enough for an AI to understand exactly what is being asked. Here's the original prompt: "${prompt}"
            
            ${advancedMode ? `Add specific instructions about tone, format, and scope. Include any necessary context or background information.` : ""}`
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}

export async function savePromptHistory(original: string, enhanced: string) {
  try {
    // In a real extension, you would use chrome.storage.local
    localStorage.setItem(
      "promptHistory",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("promptHistory") || "[]")),
        {
          original,
          enhanced,
          timestamp: new Date().toISOString(),
        },
      ])
    );
  } catch (error) {
    console.error("Error saving prompt history:", error);
  }
}

export function getPromptHistory() {
  try {
    return JSON.parse(localStorage.getItem("promptHistory") || "[]");
  } catch (error) {
    console.error("Error getting prompt history:", error);
    return [];
  }
}
