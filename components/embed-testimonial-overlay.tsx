"use client";
import { useEmbedStore, useStyleStore } from "@/lib/store/embedStore";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

  console.log(passedData);

  if (passedData?.videoUrl && type === "single" && open) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Video Testimonial</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="mb-4">
              <video 
                src={passedData.videoUrl}
                controls
                className="w-full rounded"
              />
            </div>
            <p className="text-sm">
              Video testimonials can be embedded directly. Copy the URL below to share:
            </p>
            <div className="mt-2 p-2 bg-secondary rounded flex items-center">
              <input
                type="text"
                value={`${process.env.NEXT_PUBLIC_TRUE_HOST}/embeds/testimonial/${passedData.id}?video`}
                className="bg-transparent flex-1 border-none outline-none text-sm"
                readOnly
              />
              {/* <button 
                className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/embeds/testimonial/${passedData.id}?video`);
                }}
              >
                Copy
              </button> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }


  return (
    <Drawer open={open} onOpenChange={handleClose}>
     <DrawerContent className="max-h-[90vh] mx-6 mb-4 px-4">
  <div className="overflow-y-auto max-h-[calc(90vh-2rem)] py-4">
    <EditSingleTestimonial {...passedData} />
  </div>
</DrawerContent>
    </Drawer>
  );
}

