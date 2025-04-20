"use client";

import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useNewTestimonialsDetection } from "@/lib/hooks/useNewTestimonials";
import { useCallback } from "react";
import { NewTestimonialsBanner } from "../new-testimonial-banner";

export function TextTestimonials({ spaceSlug }: { spaceSlug: string }) {
  const {
    data,
    isLoading,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useTextTestimonials(spaceSlug);

  const latestTimeStamp = data?.pages?.[0]?.items?.[0]?.createdAt || null;
  const { hasNewTestimonials, newCount, resetCount } = useNewTestimonialsDetection(
    spaceSlug,
    "TEXT",
    latestTimeStamp,
    180000 
  );

  const handleRefresh = useCallback(() => {
    refetch();
    resetCount();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [refetch, resetCount]);

  if (isLoading) return <div>Loading...</div>;
  if (status === "error") return <div>Error loading testimonials</div>;



  const allTestimonials = data?.pages.flatMap((page) => page.items) || [];

  if(!allTestimonials.length) {
    return <div>
      No text sadly
    </div>
  }

  const groupedTestimonials = [];
  for (let i = 0; i < allTestimonials.length; i += 2) {
    groupedTestimonials.push(allTestimonials.slice(i, i + 2));
  }

  return (
    <>
       {hasNewTestimonials && (
        <NewTestimonialsBanner 
          count={newCount} 
          onRefresh={handleRefresh} 
        />
      )}
      <div className="flex flex-col space-y-4">
        {groupedTestimonials.map((pair, index) => (
          <div
            key={index}
            className="grid md:grid-cols-2 gap-4 grid-flow-row auto-rows-fr"
          >
            {pair.map((testimonial: Testimonials) => (
              <div key={testimonial.id} className="h-full">
                <EachTestimonial {...testimonial} spaceSlug={spaceSlug} />
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
