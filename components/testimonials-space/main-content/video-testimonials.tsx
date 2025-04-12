"use client";

import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";
import { Button } from "@/components/ui/button";
export function VideoTestimonials({
  spaceSlug,
}: {
  spaceSlug: string;
}) {


  const {isLoading,data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useVideoTestimonials(spaceSlug)
  if (isLoading) return <div>Loading...</div>;

  if (status === "error") return <div>Error loading testimonials</div>;


  const allTestimonials = data?.pages.flatMap((page) => page.items) || [];

  if(!allTestimonials.length) return <div>
    No videos oww woo
  </div>


const groupedTestimonials = [];
for (let i = 0; i < allTestimonials.length; i += 2) {
  groupedTestimonials.push(allTestimonials.slice(i, i + 2));
}


  return (
    <>
      <div className="flex flex-col space-y-4">
        {groupedTestimonials.map((pair, index) => (
          <div
            key={index}
            className="grid md:grid-cols-2 gap-4 grid-flow-row auto-rows-fr"
          >
            {pair.map((testimonial: Testimonials) => (
              <div key={testimonial.id} className="h-full">
                <EachTestimonial {...testimonial} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            className="px-6"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      
    </>
  );
}
