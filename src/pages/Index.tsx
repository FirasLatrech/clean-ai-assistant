import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
    Loader2,
    Send,
    ZapIcon,
    Sparkles,
    RefreshCw,
    Copy,
    Check,
    MessageCircle,
    MessageSquare,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    enhancePromptWithClaude,
    savePromptHistory,
    getPromptHistory,
} from "@/utils/api";

interface Message {
    id: string;
    type: "user" | "assistant";
    content: string;
    timestamp: string;
}

const Index = () => {
    const [inputPrompt, setInputPrompt] = useState("");
    const [enhancedPrompt, setEnhancedPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [creativity, setCreativity] = useState([0.7]);
    const [advancedMode, setAdvancedMode] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("conversation");
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const history = await getPromptHistory();
                const formattedMessages: Message[] = history.flatMap(
                    (item: any, index: number) => [
                        {
                            id: `user-${index}`,
                            type: "user",
                            content: item.original,
                            timestamp: item.timestamp,
                        },
                        {
                            id: `assistant-${index}`,
                            type: "assistant",
                            content: item.enhanced,
                            timestamp: item.timestamp,
                        },
                    ]
                );

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error loading prompt history:", error);
            }
        };

        loadHistory();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const promptTemplates = {
        conversation: {
            title: "Conversation",
            description: "Chat with the AI to enhance your prompts",
            template: "Let's talk about how to improve my prompts.",
        },
        custom: {
            title: "Custom",
            description: "Write your own prompt to enhance",
            template: "Write your own prompt to enhance",
        },
        creative: {
            title: "Creative",
            description: "For writing, art, or creative projects",
            template:
                "I want to create a story about a character who discovers a hidden ability.",
        },
        technical: {
            title: "Technical",
            description: "For coding, technical projects, or documentation",
            template:
                "I need to design a user authentication system for a web application.",
        },
        business: {
            title: "Business",
            description: "For marketing, strategy, or business analysis",
            template:
                "I need to develop a marketing strategy for a new mobile app targeting young professionals.",
        },
    };

    const enhancePrompt = async () => {
        if (!inputPrompt.trim()) {
            toast({
                title: "Empty prompt",
                description: "Please enter a prompt to enhance",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            type: "user",
            content: inputPrompt,
            timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, userMessage]);

        try {
            const result = await enhancePromptWithClaude({
                prompt: inputPrompt,
                temperature: creativity[0],
                advancedMode: advancedMode,
            });

            const assistantMessage: Message = {
                id: `assistant-${Date.now()}`,
                type: "assistant",
                content: result,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setEnhancedPrompt(result);
            savePromptHistory(inputPrompt, result);
            setCopied(false);

            toast({
                title: "Prompt enhanced",
                description:
                    "Your prompt has been transformed into genius-level writing!",
            });

            if (activeTab === "conversation") {
                setInputPrompt("");
            }
        } catch (error) {
            console.error("Error enhancing prompt:", error);
            toast({
                title: "Enhancement failed",
                description: "Failed to enhance your prompt. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        toast({
            title: "Copied to clipboard",
            description: "Enhanced prompt copied to clipboard!",
        });

        setTimeout(() => setCopied(false), 2000);
    };

    const resetForm = () => {
        setInputPrompt("");
        setEnhancedPrompt("");
        setCopied(false);
    };

    const clearConversation = () => {
        setMessages([]);
        localStorage.removeItem("promptHistory");
        toast({
            title: "Conversation cleared",
            description: "Your conversation history has been cleared.",
        });
    };

    const selectTemplate = (tab: string) => {
        setActiveTab(tab);
        if (
            tab !== "custom" &&
            promptTemplates[tab as keyof typeof promptTemplates].template
        ) {
            setInputPrompt(
                promptTemplates[tab as keyof typeof promptTemplates].template ||
                    ""
            );
        }
    };

    const formatTime = (timestamp: string) => {
        if (!timestamp) return "";

        try {
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch (e) {
            return "";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-zinc-50 p-6 animate-fade-in">
            <Card className="w-full max-w-4xl shadow-lg border-0 overflow-hidden backdrop-blur-sm bg-white/90 animate-slide-up">
                <CardHeader className="pb-4 border-b bg-amber-50/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ZapIcon className="h-5 w-5 text-amber-500" />
                            <CardTitle className="text-lg font-medium">
                                Genius Prompt Enhancer
                            </CardTitle>
                        </div>
                        <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 border-amber-200 text-xs hover:bg-amber-100 cursor-pointer"
                            onClick={() =>
                                window.open(
                                    "https://www.linkedin.com/in/firaslatrech/",
                                    "_blank"
                                )
                            }
                        >
                            Created with love by Firas Latrach
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                    <Tabs
                        defaultValue="conversation"
                        value={activeTab}
                        onValueChange={selectTemplate}
                    >
                        <TabsList className="grid grid-cols-5 mb-4">
                            {Object.entries(promptTemplates).map(
                                ([key, { title }]) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className="text-xs sm:text-sm"
                                    >
                                        {title}
                                    </TabsTrigger>
                                )
                            )}
                        </TabsList>

                        {Object.entries(promptTemplates).map(
                            ([key, { description }]) => (
                                <TabsContent
                                    key={key}
                                    value={key}
                                    className="mt-0"
                                >
                                    <p className="text-xs text-zinc-500 mb-2">
                                        {description}
                                    </p>
                                </TabsContent>
                            )
                        )}
                    </Tabs>

                    {activeTab === "conversation" ? (
                        <div className="space-y-4">
                            <div className="border rounded-lg bg-zinc-50/80 h-[320px] overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-2">
                                        <MessageSquare className="h-12 w-12 opacity-20" />
                                        <p>
                                            Your conversation with Claude will
                                            appear here.
                                        </p>
                                        <p className="text-xs">
                                            Ask anything to get genius-level
                                            prompt enhancements!
                                        </p>
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${
                                                message.type === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg p-3 ${
                                                    message.type === "user"
                                                        ? "bg-amber-500 text-white"
                                                        : "bg-zinc-200 text-zinc-800"
                                                }`}
                                            >
                                                <div className="text-sm whitespace-pre-wrap">
                                                    {message.content}
                                                </div>
                                                <div
                                                    className={`text-xs mt-1 ${
                                                        message.type === "user"
                                                            ? "text-amber-100"
                                                            : "text-zinc-500"
                                                    }`}
                                                >
                                                    {formatTime(
                                                        message.timestamp
                                                    )}
                                                    {message.type ===
                                                        "assistant" && (
                                                        <Button
                                                            onClick={() =>
                                                                copyToClipboard(
                                                                    message.content
                                                                )
                                                            }
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-5 ml-2 px-1 text-xs hover:bg-zinc-300"
                                                        >
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="flex items-end gap-2">
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Label
                                                htmlFor="creativity"
                                                className="text-xs text-zinc-500"
                                            >
                                                Creativity
                                            </Label>
                                            <Slider
                                                id="creativity"
                                                value={creativity}
                                                onValueChange={setCreativity}
                                                max={1}
                                                step={0.01}
                                                className="w-24 [&>span]:bg-amber-500"
                                            />
                                            <span className="text-xs text-zinc-500">
                                                {Math.round(
                                                    creativity[0] * 100
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="advanced-mode"
                                                checked={advancedMode}
                                                onCheckedChange={
                                                    setAdvancedMode
                                                }
                                                className="data-[state=checked]:bg-amber-500"
                                            />
                                            <Label
                                                htmlFor="advanced-mode"
                                                className="text-xs text-zinc-500"
                                            >
                                                Advanced
                                            </Label>
                                        </div>
                                    </div>
                                    <Textarea
                                        value={inputPrompt}
                                        onChange={(e) =>
                                            setInputPrompt(e.target.value)
                                        }
                                        placeholder="Type your prompt here and let our AI transform it into genius-level writing..."
                                        className="min-h-[80px] resize-none border-zinc-200 focus:border-amber-500 focus:ring-amber-500 transition-all"
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" &&
                                                !e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                enhancePrompt();
                                            }
                                        }}
                                    />
                                </div>
                                <Button
                                    onClick={enhancePrompt}
                                    disabled={isLoading}
                                    className="bg-amber-500 hover:bg-amber-600 text-white h-[80px] px-4"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Send className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={clearConversation}
                                    className="text-zinc-600 border-zinc-300 hover:bg-zinc-100 text-xs"
                                    disabled={
                                        messages.length === 0 || isLoading
                                    }
                                >
                                    Clear Conversation
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="input-prompt"
                                    className="text-sm font-medium text-zinc-700"
                                >
                                    Your Prompt
                                </Label>
                                <div className="flex items-center space-x-2">
                                    <Label
                                        htmlFor="advanced-mode"
                                        className="text-xs text-zinc-500"
                                    >
                                        Advanced Mode
                                    </Label>
                                    <Switch
                                        id="advanced-mode"
                                        checked={advancedMode}
                                        onCheckedChange={setAdvancedMode}
                                        className="data-[state=checked]:bg-amber-500"
                                    />
                                </div>
                            </div>
                            <Textarea
                                id="input-prompt"
                                value={inputPrompt}
                                onChange={(e) => setInputPrompt(e.target.value)}
                                placeholder="Enter your prompt here and let our AI transform it into genius-level writing..."
                                className="min-h-[120px] resize-none border-zinc-200 focus:border-amber-500 focus:ring-amber-500 transition-all"
                            />

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium text-zinc-700">
                                        Creativity Level
                                    </Label>
                                    <span className="text-xs text-zinc-500">
                                        {Math.round(creativity[0] * 100)}%
                                    </span>
                                </div>
                                <Slider
                                    value={creativity}
                                    onValueChange={setCreativity}
                                    max={1}
                                    step={0.01}
                                    className="[&>span]:bg-amber-500"
                                />
                                <div className="flex justify-between text-xs text-zinc-400">
                                    <span>Precise</span>
                                    <span>Balanced</span>
                                    <span>Creative</span>
                                </div>
                            </div>

                            {enhancedPrompt && (
                                <div className="space-y-3 pt-3 border-t animate-fade-in">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="enhanced-prompt"
                                            className="text-sm font-medium text-zinc-700"
                                        >
                                            Genius-Level Prompt
                                        </Label>
                                        <Button
                                            onClick={() =>
                                                copyToClipboard(enhancedPrompt)
                                            }
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs hover:bg-zinc-100"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="mr-1 h-3.5 w-3.5 text-green-500" />{" "}
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="mr-1 h-3.5 w-3.5" />{" "}
                                                    Copy All
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <Textarea
                                        id="enhanced-prompt"
                                        value={enhancedPrompt}
                                        readOnly
                                        className="min-h-[160px] resize-none bg-amber-50/30 border-zinc-200 text-zinc-800"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
                {activeTab !== "conversation" && (
                    <CardFooter className="flex justify-between pt-2 border-t bg-zinc-50/80">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={resetForm}
                            className="text-zinc-600 border-zinc-300 hover:bg-zinc-100"
                            disabled={isLoading}
                        >
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            Reset
                        </Button>
                        <Button
                            onClick={enhancePrompt}
                            disabled={isLoading}
                            className="bg-amber-500 hover:bg-amber-600 text-white button-glow"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Enhancing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Transform to Genius
                                </>
                            )}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
};

export default Index;
