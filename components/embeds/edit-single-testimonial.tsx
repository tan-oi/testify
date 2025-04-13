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

export function EditSingleTestimonial({ 
  content,
  createdAt,
  id,
  rating,
  senderEmail,
  senderName,
  videoUrl 
 }: Partial<Testimonials>) {

  

  const generateEmbedCode = (testimonialId: string): string => {
    const { styles } = useStyleStore(); 
    console.log(styles,"styles");

    const wrapperStyle = styles.wrapper || {};
    const contentStyle = styles.content || {};

    const cleanObject = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([, val]) => val !== undefined && val !== null)
      .map(([key, val]) => [key, String(val)])
  );


    const wrapper = cleanObject(wrapperStyle);
    const content = cleanObject(contentStyle);

    const queryParams = new URLSearchParams({
      wrapper: JSON.stringify(wrapper),
      content: JSON.stringify(content),
    });

    const embedUrl = `http://localhost:3000/embeds/testimonial/${testimonialId}?${queryParams.toString()}`;

    return `<iframe src="${embedUrl}" width="100%" height="200" frameborder="0"></iframe>`;
  };

  return (
    <div className="py-4">
      <h2 className="text-center font-bold">
        Edit Your Testimonial to look exactly like you want
      </h2>

      <Tabs defaultValue="design">
        <TabsList className="grid grid-cols-4 gap-4 mb-4">
          <TabsTrigger value="design" className="mr-4">
            Design
          </TabsTrigger>
          <TabsTrigger value="border">Border</TabsTrigger>
          <TabsTrigger value="font">Font</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <EditDesignOption />
        </TabsContent>

        <TabsContent value="border">
          <EditBorderOption />
        </TabsContent>

        <TabsContent value="background">
          <EditBackgroundOption />
        </TabsContent>

        <TabsContent value="font">
          <EditFontOption />
        </TabsContent>
      </Tabs>

      <h3>Live Preview</h3>
      <EditEmbedPreview content={content as string} senderName={senderName as string} />

      <div className="mt-10">
        <h3>Embed Code</h3>
        <textarea
          readOnly
          value={generateEmbedCode(id ?? "unknown")}
          style={{ width: "100%", height: "180px", maxHeight: "300px" }}
        />
      </div>

      <div className="flex justify-end items-center pr-2 mt-4">
        <Button size={"lg"}>
          Save edit
        </Button>
      </div>
    </div>
  );
}
