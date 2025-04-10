"use client";
import { useEmbedStore, useStyleStore } from "@/lib/store/embedStore";
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

import { EditSingleTestimonial } from "./embeds/edit-single-testimonial";

export function EmbedTestimonialOverlay() {
  const open = useEmbedStore((state) => state.open);

  const close = useEmbedStore((state) => state.close);
  const passedData = useEmbedStore((state) => state.overlayData);
  const type = useEmbedStore((state) => state.type);
  const resetStyles = useStyleStore((state) => state.resetStyles);
  const handleClose = () => {
    close();
    resetStyles();
  };

  return (
    <Drawer open={open} onOpenChange={handleClose}>
     <DrawerContent className="max-h-[90vh] mx-6 mb-4 px-4">
  <div className="overflow-y-auto max-h-[calc(90vh-2rem)] py-4">
    <EditSingleTestimonial data={passedData} />
  </div>
</DrawerContent>
    </Drawer>
  );
}
