"use client";
import { contentStore } from "@/lib/store/contentStore";
import { TextTestimonials } from "./main-content/text-testimonials";
import { VideoTestimonials } from "./main-content/video-testimonials";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

export function TestimonialsList({ spaceSlug,spaceId }: { spaceSlug: string,spaceId:string }) { 
  const queryClient = useQueryClient();
  const currentView = contentStore((state) => state.currentView)

 
  if(currentView === "all") return <p>Taks is rendering</p>
  if(currentView === "videos") return <VideoTestimonials spaceSlug={spaceSlug} />
  if(currentView === "liked") return <p>ked is rendering</p>
  return (
    <>
   <TextTestimonials spaceSlug={spaceSlug}/>  
      {/* <div className="grid lg:grid-cols-3">
        <div className="rounded-2xl bg-secondary">
            <SpaceSidebar/>
  
        </div>
        <div className="cols-span-2">
          
        </div>
        </div> */}

       
    </>
  );
}

