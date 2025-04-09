import { Testimonials } from "@prisma/client";
import { useState } from "react";
import { EditEmbedPreview } from "./edit-preview";
import { useStyleStore } from "@/lib/store/embedStore";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { EditBackgroundOption, EditBorderOption, EditDesignOption, EditFontOption } from "./edit-options";

export function EditSingleTestimonial({ data }: Partial<Testimonials>) {
  const { styles, updateContentStyle, updateWrapperStyle } = useStyleStore();
  console.log(data);

  

  
  return (
    <div className="py-4">
      <h2 className="text-center font-bold">Edit Your Testimonial to look exactly like you want</h2>

      <Tabs defaultValue="design">
        <TabsList className="grid grid-cols-4 gap-4 mb-4">
            <TabsTrigger value="design" className="mr-4">Design</TabsTrigger>
            <TabsTrigger value="border">Border</TabsTrigger>
            <TabsTrigger value="font">Font</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
        <EditDesignOption/>
        </TabsContent>

        <TabsContent value="border">
          <EditBorderOption/>
        </TabsContent>

        <TabsContent value="background">
          <EditBackgroundOption/>
        </TabsContent>

        <TabsContent value="font">
            <EditFontOption/>
        </TabsContent>
      </Tabs>
     
      <h3>Live Preview</h3>
      <EditEmbedPreview content={data?.content} senderName={data?.senderName}/>

      <h3>Embed Code</h3>
      <textarea readOnly style={{ width: "100%", height: "200px" }} />
    </div>
  );
}
