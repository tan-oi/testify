"use client";

import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useNewTestimonialsDetection } from "@/lib/hooks/useNewTestimonials";
import { useCallback } from "react";
import { NewTestimonialsBanner } from "../new-testimonial-banner";
export function VideoTestimonials({ spaceSlug }: { spaceSlug: string }) {
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useVideoTestimonials(spaceSlug);

  const latestTimeStamp = data?.pages?.[0]?.items?.[0]?.createdAt || null;

  const { hasNewTestimonials, newCount, resetCount } =
    useNewTestimonialsDetection(spaceSlug, "VIDEO", latestTimeStamp, 180000);

  const handleRefresh = useCallback(() => {
    refetch();
    resetCount();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [refetch, resetCount]);
  if (isLoading) return <div>Loading...</div>;

  if (status === "error") return <div>Error loading testimonials</div>;

  const allTestimonials = data?.pages.flatMap((page) => page.items) || [];

  if (!allTestimonials || allTestimonials.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500 mb-2">No video testimonials yet</p>
        <p className="text-gray-400 text-sm">
          They very well might come in, check if you've asked for them!
        </p>
      </div>
    );

  const groupedTestimonials = [];
  for (let i = 0; i < allTestimonials.length; i += 2) {
    groupedTestimonials.push(allTestimonials.slice(i, i + 2));
  }

  return (
    <>
      {hasNewTestimonials && (
        <NewTestimonialsBanner count={newCount} onRefresh={handleRefresh} />
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
