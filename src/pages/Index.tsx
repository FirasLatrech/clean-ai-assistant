
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Loader2, Send, ZapIcon, Sparkles, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { enhancePromptWithClaude, savePromptHistory } from "@/utils/api";

const Index = () => {
  const [inputPrompt, setInputPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [creativity, setCreativity] = useState([0.7]);
  const [advancedMode, setAdvancedMode] = useState(false);
  const { toast } = useToast();

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
    try {
      const result = await enhancePromptWithClaude({
        prompt: inputPrompt,
        temperature: creativity[0],
        advancedMode: advancedMode
      });
      
      setEnhancedPrompt(result);
      savePromptHistory(inputPrompt, result);
      
      toast({
        title: "Prompt enhanced",
        description: "Your prompt has been successfully enhanced!",
      });
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    toast({
      title: "Copied to clipboard",
      description: "Enhanced prompt copied to clipboard!",
    });
  };

  const resetForm = () => {
    setInputPrompt("");
    setEnhancedPrompt("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6 animate-fade-in">
      <Card className="w-full max-w-3xl shadow-lg border-0 overflow-hidden backdrop-blur-sm bg-white/80 animate-slide-up">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ZapIcon className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg font-medium">Prompt Enhancer</CardTitle>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              Powered by Claude AI
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="input-prompt" className="text-sm font-medium text-zinc-700">Your Prompt</Label>
              <div className="flex items-center space-x-2">
                <Label htmlFor="advanced-mode" className="text-xs text-zinc-500">Advanced Mode</Label>
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
              placeholder="Enter your prompt here..."
              className="min-h-[120px] resize-none border-zinc-200 focus:border-amber-500 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-zinc-700">Creativity Level</Label>
              <span className="text-xs text-zinc-500">{Math.round(creativity[0] * 100)}%</span>
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
              <Label htmlFor="enhanced-prompt" className="text-sm font-medium text-zinc-700">Enhanced Prompt</Label>
              <div className="relative">
                <Textarea
                  id="enhanced-prompt"
                  value={enhancedPrompt}
                  readOnly
                  className="min-h-[160px] resize-none bg-zinc-50 border-zinc-200"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-7 text-xs hover:bg-zinc-200"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </CardContent>
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
                Enhance Prompt
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
