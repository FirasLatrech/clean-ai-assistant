
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
    const mockResponses = {
      default: "Your prompt has been enhanced with more specificity and clarity. I've added structure and key details to make it more effective.",
      app: "I want to build a mobile app that [specific purpose/function]. The app should include the following key features: [list 3-5 essential features]. The target audience is [specific demographic]. The app should have a [specific design style] interface and prioritize [specific qualities like speed, simplicity, etc.]. I need detailed guidance on the tech stack, development approach, and potential challenges to consider during development.",
      website: "I need to create a website for [specific purpose]. The website should include these essential pages: [list pages]. Key functionality requirements include [specific functions]. The target audience is [specific demographic]. The design should be [specific style] with an emphasis on [specific qualities like responsiveness, accessibility, etc.]. Please provide recommendations for the tech stack and development approach.",
      essay: "Please help me write a comprehensive essay about [specific topic]. The essay should cover these key aspects: [list main points]. It should be approximately [word count] words and written in a [specific tone/style]. The intended audience is [specific readers]. Please include relevant research, examples, and counter-arguments where appropriate. The essay should follow [specific structure or format] and maintain academic integrity throughout."
    };

    // In a real extension, we would use the Claude API
    // For now, let's simulate a response to avoid CORS issues
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // Choose different mock responses based on prompt content
    let response = mockResponses.default;
    if (prompt.toLowerCase().includes("app")) {
      response = mockResponses.app;
    } else if (prompt.toLowerCase().includes("website")) {
      response = mockResponses.website;
    } else if (prompt.toLowerCase().includes("essay")) {
      response = mockResponses.essay;
    }
    
    // If using advanced mode, add more detailed guidance
    if (advancedMode) {
      response += "\n\nAdditional considerations:\n• Be consistent in tone throughout\n• Consider including specific examples to illustrate key points\n• Address potential objections or alternative perspectives\n• Structure your content with clear headings and logical flow\n• Conclude with actionable next steps or key takeaways";
    }
    
    return response;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}

export async function savePromptHistory(original: string, enhanced: string) {
  try {
    // In a real extension, you would use chrome.storage.local
    const currentHistory = getPromptHistory();
    localStorage.setItem(
      "promptHistory",
      JSON.stringify([
        ...currentHistory,
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
