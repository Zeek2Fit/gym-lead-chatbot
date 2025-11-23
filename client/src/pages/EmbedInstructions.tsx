import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Check, Code, FileCode } from "lucide-react";

export default function EmbedInstructions() {
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- Dad Bod Reset Chatbot Widget -->
<script>
  (function() {
    var chatbotScript = document.createElement('script');
    chatbotScript.src = '${window.location.origin}/widget.js';
    chatbotScript.async = true;
    document.head.appendChild(chatbotScript);
  })();
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl mb-2">WordPress Integration</h1>
        <p className="text-muted-foreground">
          Add the Dad Bod Reset chatbot to your WordPress website in under 2 minutes
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Code className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Embed Code</h2>
            <p className="text-sm text-muted-foreground">
              Copy this code and paste it into your WordPress site
            </p>
          </div>
        </div>

        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
            <code>{embedCode}</code>
          </pre>
          <Button
            onClick={handleCopy}
            size="sm"
            className="absolute top-2 right-2"
            data-testid="button-copy-embed"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy Code
              </>
            )}
          </Button>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">Installation Steps</h2>
            <p className="text-sm text-muted-foreground">
              Follow these simple steps to add the chatbot to WordPress
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Access WordPress Admin</h3>
              <p className="text-sm text-muted-foreground">
                Log in to your WordPress dashboard (usually at yoursite.com/wp-admin)
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Navigate to Theme Editor</h3>
              <p className="text-sm text-muted-foreground">
                Go to Appearance → Theme File Editor (or use a plugin like "Insert Headers and Footers")
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Paste the Code</h3>
              <p className="text-sm text-muted-foreground">
                Add the embed code to your theme's footer.php file (before the closing &lt;/body&gt; tag) or use the "Insert Headers and Footers" plugin to add it to the footer section
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Save and Test</h3>
              <p className="text-sm text-muted-foreground">
                Save your changes and visit your website. The chat button should appear in the bottom-right corner. Click it to test the conversation flow!
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold mb-2">Tips for Best Results</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>The widget is fully responsive - works great on mobile and desktop</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>All leads are automatically saved and can be exported from the Admin Panel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>The chatbot adapts to your brand voice - customize the Brand Bible to match your gym's personality</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Widget loads asynchronously so it won't slow down your site</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
