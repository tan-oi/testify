"use client";
import { contentStore } from "@/lib/store/contentStore";
import { AllTestimonials } from "./main-content/all-testimonials";

export function TestimonialsList({ spaceSlug }: { spaceSlug: string }) { 
  
  const currentView = contentStore((state) => state.currentView)


  if(currentView === "texts") return <p>Taks is rendering</p>
  if(currentView === "videos") return <p>vods is rendering</p>
  if(currentView === "liked") return <p>ked is rendering</p>
  return (
    <>
   <AllTestimonials spaceSlug={spaceSlug} />
      {/* <div className="grid lg:grid-cols-3">
        <div className="rounded-2xl bg-secondary">
            <SpaceSidebar/>
  
        </div>
        <div className="cols-span-2">
          
        </div>
        </div> */}
        ok
    </>
  );
}

