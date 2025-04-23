"use client";
import { contentStore } from "@/lib/store/contentStore";
import { TextTestimonials } from "./main-content/text-testimonials";
import { VideoTestimonials } from "./main-content/video-testimonials";
import { AllTestimonials } from "./main-content/all-testimonials";
import { LikedTestimonials } from "./main-content/liked-testimonials";
import { ImportTestimonials } from "./import-testimonials"
import { toast } from "sonner";
import { RequestTestimonial } from "./main-content/request-testimonial";

import { useDeleteModal, useSpaceModalStore } from "@/lib/store/spaceStore";

export function TestimonialsList({
  spaceSlug,
}: {
  spaceSlug: string;
  spaceId: string;
}) {
  const currentView = contentStore((state) => state.currentView);
 
  console.log(currentView);
  if (currentView === "all") return <AllTestimonials spaceSlug={spaceSlug} />;
  if (currentView === "videos")
    return <VideoTestimonials spaceSlug={spaceSlug} />;
  if (currentView === "liked")
    return <LikedTestimonials spaceSlug={spaceSlug} />;
  if (currentView.includes("twitter"))
    return <ImportTestimonials spaceSlug={spaceSlug}/>
  if(currentView === "request")
  return <RequestTestimonial spaceSlug={spaceSlug}/>
  
  return (
    <>
      <div className="pb-6">
        <TextTestimonials spaceSlug={spaceSlug} />
        
      </div>
    </>
  );
}

