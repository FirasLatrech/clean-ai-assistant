// Add Chrome extension types
declare global {
  interface Window {
    chrome?: {
      storage: {
        local: {
          get: (keys: string[], callback: (result: any) => void) => void;
          set: (items: object, callback?: () => void) => void;
        };
      };
    };
  }
}

// Claude API key - Using environment variable for security
// In production, this should be handled through a secure backend service
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || "";

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
    // For the Chrome extension, we'll use mock responses to avoid CORS issues
    // In production, this would use a background script to make the actual API call

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate genius-level prompts based on the input
    if (prompt.trim().length === 0) {
      return "Please enter a prompt to enhance.";
    }

    // Extract key topics from the prompt
    const topics = prompt.split(/[.,;!?]/)
      .map(p => p.trim())
      .filter(p => p.length > 3);

    const promptType = detectPromptType(prompt);

    let enhancedPrompt = "";

    // Expert prompt construction based on type
    switch (promptType) {
      case 'creative':
        enhancedPrompt = createCreativePrompt(prompt, advancedMode);
        break;
      case 'technical':
        enhancedPrompt = createTechnicalPrompt(prompt, advancedMode);
        break;
      case 'business':
        enhancedPrompt = createBusinessPrompt(prompt, advancedMode);
        break;
      case 'educational':
        enhancedPrompt = createEducationalPrompt(prompt, advancedMode);
        break;
      default:
        enhancedPrompt = createGeneralPrompt(prompt, advancedMode);
    }

    // Apply temperature-based variations
    if (temperature > 0.7) {
      enhancedPrompt += "\n\nEXPLORE UNCONVENTIONAL ANGLES: Consider unexpected perspectives and creative solutions that challenge standard approaches.";
    }

    if (advancedMode) {
      enhancedPrompt += "\n\nADVANCED CONSIDERATIONS:\n• Approach this from multiple perspectives\n• Consider both immediate and long-term implications\n• Address potential counterarguments or limitations\n• Incorporate relevant frameworks, methodologies, or research\n• Suggest specific metrics for evaluating success";
    }

    return enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}

// Helper functions for prompt enhancement

function detectPromptType(prompt: string): string {
  const lowercase = prompt.toLowerCase();

  if (lowercase.includes('create') || lowercase.includes('design') || lowercase.includes('story') ||
      lowercase.includes('novel') || lowercase.includes('art') || lowercase.includes('music')) {
    return 'creative';
  }

  if (lowercase.includes('code') || lowercase.includes('program') || lowercase.includes('develop') ||
      lowercase.includes('build') || lowercase.includes('technical') || lowercase.includes('algorithm')) {
    return 'technical';
  }

  if (lowercase.includes('business') || lowercase.includes('marketing') || lowercase.includes('strategy') ||
      lowercase.includes('sales') || lowercase.includes('customer') || lowercase.includes('product')) {
    return 'business';
  }

  if (lowercase.includes('teach') || lowercase.includes('explain') || lowercase.includes('learn') ||
      lowercase.includes('educational') || lowercase.includes('concept') || lowercase.includes('understand')) {
    return 'educational';
  }

  return 'general';
}

function createGeneralPrompt(prompt: string, advanced: boolean): string {
  const base = `${prompt}\n\nPlease provide a comprehensive response that:
1. Outlines the key aspects and dimensions of this topic
2. Explores different perspectives and viewpoints
3. Provides concrete examples and specific details
4. Offers actionable insights and practical applications
5. Considers potential challenges and how to address them`;

  return base;
}

function createCreativePrompt(prompt: string, advanced: boolean): string {
  return `I need a creative masterpiece on: ${prompt}\n\nPlease develop this with:
1. Rich, evocative language that engages multiple senses
2. A distinct narrative voice or perspective that fits the content
3. Innovative structure with natural progression and flow
4. Meaningful themes that resonate with universal human experiences
5. Creative techniques like metaphor, imagery, and symbolism
6. Emotional depth that connects with the audience
7. Original ideas that avoid clichés and predictable elements`;
}

function createTechnicalPrompt(prompt: string, advanced: boolean): string {
  return `I need a technical solution for: ${prompt}\n\nPlease provide:
1. A clear problem statement with technical specifications and requirements
2. A systematic analysis of possible approaches and their trade-offs
3. A detailed implementation strategy with architecture overview
4. Specific technologies, tools, or frameworks with justification
5. Consideration of performance, scalability, security, and maintainability
6. Potential challenges and mitigation strategies
7. Testing and validation approaches`;
}

function createBusinessPrompt(prompt: string, advanced: boolean): string {
  return `I need a business strategy for: ${prompt}\n\nPlease develop:
1. Market analysis with target audience definition and competitive landscape
2. Clear value proposition and unique selling points
3. Business model with revenue streams and cost structure
4. Go-to-market strategy and customer acquisition approach
5. Key performance indicators and success metrics
6. Risk assessment and contingency planning
7. Implementation roadmap with short and long-term objectives`;
}

function createEducationalPrompt(prompt: string, advanced: boolean): string {
  return `I need to learn about: ${prompt}\n\nPlease provide:
1. A clear explanation of fundamental concepts using accessible language
2. Logical organization progressing from basic to advanced understanding
3. Concrete examples and real-world applications that illustrate key points
4. Analogies or metaphors that bridge familiar and unfamiliar concepts
5. Visual descriptions or diagrams where appropriate
6. Common misconceptions and their corrections
7. Practical exercises or applications to reinforce understanding`;
}

export async function savePromptHistory(original: string, enhanced: string) {
  try {
    // Use chrome.storage.local for Chrome extension
    if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
      const currentHistory = await getPromptHistory();
      window.chrome.storage.local.set({
        promptHistory: [
          ...currentHistory,
          {
            original,
            enhanced,
            timestamp: new Date().toISOString(),
          },
        ]
      });
    } else {
      // Fallback to localStorage for web version
      const currentHistory = await getPromptHistory();
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
    }
  } catch (error) {
    console.error("Error saving prompt history:", error);
  }
}

export async function getPromptHistory(): Promise<any[]> {
  try {
    // Use chrome.storage.local for Chrome extension
    if (typeof window !== 'undefined' && window.chrome && window.chrome.storage) {
      return new Promise((resolve) => {
        window.chrome.storage.local.get(['promptHistory'], (result) => {
          resolve(result.promptHistory || []);
        });
      });
    } else {
      // Fallback to localStorage for web version
      return JSON.parse(localStorage.getItem("promptHistory") || "[]");
    }
  } catch (error) {
    console.error("Error getting prompt history:", error);
    return [];
  }
}
