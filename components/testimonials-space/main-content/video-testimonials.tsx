"use client";

import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";

export function VideoTestimonials({
  spaceSlug,
  
}: {
  spaceSlug: string;
  
}) {


  const {isLoading,data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useVideoTestimonials(spaceSlug)
  if (isLoading) return <div>Loading...</div>;

  if (status === "error") return <div>Error loading testimonials</div>;
  return (
    <>
   <div>

   
    {
      data?.pages.map((items,i) => (
        <div className="grid md:grid-cols-2 gap-4" key={i}>
            {
              items.items.length === 0 ? "not found" : 
              items.items.map((obj: Testimonials) => (
                  <div key={obj.id}>
                   <EachTestimonial {...obj} />
                    </div>
              ))
            }
        </div>
      ))
    }
    </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
