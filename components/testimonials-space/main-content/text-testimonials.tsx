"use client";

import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial";
import {EachTestimonial} from "../each-testimonial"
import { Testimonials } from "@prisma/client";
export function TextTestimonials({
  spaceSlug,
  
}: {
  spaceSlug: string;
  
}) {

  const {data,isLoading, status, hasNextPage, isFetchingNextPage, fetchNextPage} = useTextTestimonials(spaceSlug)

  if (isLoading) return <div>Loading...</div>;

  if (status === "error") return <div>Error loading testimonials</div>;
  return (
    <>
    




    {
      data?.pages.map((items,i) => (
        <div className="grid md:grid-cols-2 gap-4" key={i}>
            {
              items.items.map((obj: Testimonials) => (
                  <div key={obj.id}>
                   <EachTestimonial {...obj} />
                    </div>
              ))
            }
        </div>
      ))
    }
    
   

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
