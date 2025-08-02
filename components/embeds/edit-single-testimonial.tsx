import { Testimonials } from "@prisma/client";
import { EditEmbedPreview } from "./edit-preview";
import { useStyleStore } from "@/lib/store/embedStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EditBackgroundOption,
  EditBorderOption,
  EditDesignOption,
  EditFontOption,
} from "./edit-options";
import { Button } from "../ui/button";
import { createTestimonialEmbed, updateTestimonialEmbed, getTestimonialEmbeds } from "@/app/actions/testimonials.actions";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Palette, Type, Layout, Square, Copy, Check, Grid, Quote } from "lucide-react";
import { generateEmbedUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useEmbedCache } from "@/lib/store/embedStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function EditSingleTestimonial({
  content,
  createdAt,
  id,
  rating,
  senderEmail,
  senderName,
  videoUrl,
}: Partial<Testimonials>) {
  console.log("EditSingleTestimonial component rendered for testimonial:", id);
  const [loading, setLoading] = useState(false);
  const [embeds, setEmbeds] = useState<any[]>([]);
  const [copiedEmbedId, setCopiedEmbedId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const { styles } = useStyleStore();
  const { getEmbeds, setEmbeds: setCachedEmbeds, clearTestimonialCache } = useEmbedCache();

  // Load existing embeds from cache or API
  useEffect(() => {
    if (id) {
      loadEmbeds();
    }
  }, [id]);

  const loadEmbeds = async () => {
    // Check cache first
    const cachedEmbeds = getEmbeds(id as string);
    if (cachedEmbeds) {
      console.log("Loading embeds from cache for testimonial:", id);
      setEmbeds(cachedEmbeds);
      return;
    }
    
    // If not in cache, fetch from API only once
    console.log("Loading embeds from API for testimonial:", id);
    const result = await getTestimonialEmbeds(id as string);
    if (result.success) {
      setEmbeds(result.data);
      setCachedEmbeds(id as string, result.data);
    }
  };

  const saveEmbed = async () => {
    setLoading(true);
    try {
      const result = await createTestimonialEmbed(id as string, styles, selectedTemplate);
      
      if (result.success) {
        toast.success("Embed created successfully!");
        // Add the new embed to the list and update cache
        const newEmbeds = [result.data, ...embeds];
        setEmbeds(newEmbeds);
        setCachedEmbeds(id as string, newEmbeds);
      } else {
        toast.error("Failed to create embed");
      }
    } catch (error) {
      toast.error("Error creating embed");
    } finally {
      setLoading(false);
    }
  };

  const copyEmbedCode = async (embedId: string) => {
    const embedUrl = generateEmbedUrl(embedId);
    const iframeCode = `<iframe src="${embedUrl}" width="100%" height="300" frameborder="0"></iframe>`;
    
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopiedEmbedId(embedId);
      toast.success("Embed code copied to clipboard!");
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedEmbedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy embed code");
    }
  };

  const copyEmbedUrl = async (embedId: string) => {
    const embedUrl = generateEmbedUrl(embedId);
    
    try {
      await navigator.clipboard.writeText(embedUrl);
      setCopiedEmbedId(embedId);
      toast.success("Embed URL copied to clipboard!");
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedEmbedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy embed URL");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Customize Your Testimonial
        </h2>
        <p className="text-muted-foreground">
          Design your testimonial to match your brand and website style
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Design Controls */}
        <div className="space-y-6">
          {/* Template Selector */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Grid className="w-5 h-5" />
                Template Style
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">
                    <div className="flex items-center gap-2">
                      <Quote className="w-4 h-4" />
                      Classic Card
                    </div>
                  </SelectItem>
                  <SelectItem value="modern">
                    <div className="flex items-center gap-2">
                      <Layout className="w-4 h-4" />
                      Modern Side-by-Side
                    </div>
                  </SelectItem>
                  <SelectItem value="minimal">
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      Minimal Quote
                    </div>
                  </SelectItem>
                  <SelectItem value="social">
                    <div className="flex items-center gap-2">
                      <Grid className="w-4 h-4" />
                      Social Media Style
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5" />
                Design Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="design" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="design" className="flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    Layout
                  </TabsTrigger>
                  <TabsTrigger value="border" className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    Border
                  </TabsTrigger>
                  <TabsTrigger value="font" className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Typography
                  </TabsTrigger>
                  <TabsTrigger value="background" className="flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Colors
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="design" className="space-y-4">
                    <EditDesignOption />
                  </TabsContent>

                  <TabsContent value="border" className="space-y-4">
                    <EditBorderOption />
                  </TabsContent>

                  <TabsContent value="background" className="space-y-4">
                    <EditBackgroundOption />
                  </TabsContent>

                  <TabsContent value="font" className="space-y-4">
                    <EditFontOption />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Save Embed Button */}
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button 
                size="lg" 
                onClick={saveEmbed}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Creating Embed..." : "Create New Embed"}
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  // Clear cache and reload
                  clearTestimonialCache(id as string);
                  setEmbeds([]);
                  loadEmbeds();
                }}
                className="w-full"
              >
                Refresh Embeds
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Live Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                See how your testimonial will look when embedded
              </p>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <EditEmbedPreview
                  content={content as string}
                  senderName={senderName as string}
                  rating={rating as number}
                  template={selectedTemplate}
                />
              </div>
            </CardContent>
          </Card>

          {/* Existing Embeds */}
          {embeds.length > 0 && (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Your Embeds</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Copy and use these embed codes on your website
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {embeds.map((embed) => (
                  <div key={embed.embedId} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Embed ID: {embed.embedId}</p>
                        <p className="text-xs text-muted-foreground">
                          Created {new Date(embed.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyEmbedUrl(embed.embedId)}
                          className="flex items-center gap-2"
                        >
                          {copiedEmbedId === embed.embedId ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          URL
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyEmbedCode(embed.embedId)}
                          className="flex items-center gap-2"
                        >
                          {copiedEmbedId === embed.embedId ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          Code
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs bg-muted p-2 rounded">
                      <p className="font-medium mb-1">Embed URL:</p>
                      <p className="text-muted-foreground break-all">
                        {generateEmbedUrl(embed.embedId)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
