"use client";
import { contentStore } from "@/lib/store/contentStore";
import { TextTestimonials } from "./main-content/text-testimonials";
import { VideoTestimonials } from "./main-content/video-testimonials";
import { AllTestimonials } from "./main-content/all-testimonials";

export function TestimonialsList({ spaceSlug,spaceId }: { spaceSlug: string,spaceId:string }) { 
  
  const currentView = contentStore((state) => state.currentView)

 
  if(currentView === "all") return <AllTestimonials spaceSlug={spaceSlug} />
  if(currentView === "videos") return <VideoTestimonials spaceSlug={spaceSlug} />
  if(currentView === "liked") return <p>ked is rendering</p>
  return (
    <>
    <div className="pb-6">
      
   <TextTestimonials spaceSlug={spaceSlug}/>  
    </div>
     

       
    </>
  );
}

