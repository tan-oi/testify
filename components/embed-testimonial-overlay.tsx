"use client";
import { useEmbedStore } from "@/lib/store/embedStore";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { EditSingleTestimonial } from "./embeds/edit-single-testimonial";

export function EmbedTestimonialOverlay() {
  const open = useEmbedStore((state) => state.open);

  const close = useEmbedStore((state) => state.close);
  const passedData = useEmbedStore((state) => state.overlayData);
  const type = useEmbedStore((state) => state.type);

       

    return (
      <Drawer open={open} onOpenChange={close}>
        <DrawerContent className="h-[90vh] max-h-[90vh] mx-6 no-scrollbar overflow-y-scroll mb-4 px-4">
          <EditSingleTestimonial data={passedData}/>
        </DrawerContent>
      </Drawer>
    );
 
}
