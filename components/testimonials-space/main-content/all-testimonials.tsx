"use client";
import { Button } from "@/components/ui/button";
import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial";
import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";
import { EachTestimonial } from "../each-testimonial";
import { Testimonials } from "@prisma/client";
export function AllTestimonials({ spaceSlug }: { spaceSlug: string }) {
  const {
    data: textData,
    isLoading: textLoading,
    hasNextPage: hasNextTextPage,
    fetchNextPage: fetchNextTextPage,
    isFetchingNextPage: isFetchingNextTextPage,
    status: textStatus,
  } = useTextTestimonials(spaceSlug);

  const {
    data: videoData,
    isLoading: videoLoading,
    hasNextPage: hasNextVideoPage,
    fetchNextPage: fetchNextVideoPage,
    isFetchingNextPage: isFetchingNextVideoPage,
    status: videoStatus,
  } = useVideoTestimonials(spaceSlug);

  if (textLoading || videoLoading) return <div>loading</div>;

  if (textStatus === "error" || videoStatus === "error")
    return <div>some error occured, refresh!</div>;

  const allText = textData?.pages.flatMap((page) => page.items) || [];
  const allVideo = videoData?.pages.flatMap((page) => page.items) || [];

  const merged = [...allText, ...allVideo].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const groupedTestimonials = [];
  for (let i = 0; i < merged.length; i += 2) {
    groupedTestimonials.push(merged.slice(i, i + 2));
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
                <EachTestimonial {...testimonial} spaceSlug={spaceSlug} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {(hasNextTextPage || hasNextVideoPage) && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={() => {
              if (hasNextTextPage) fetchNextTextPage();
              if (hasNextVideoPage) fetchNextVideoPage();
            }}
            disabled={isFetchingNextTextPage || isFetchingNextVideoPage}
            variant="outline"
          >
            {isFetchingNextTextPage || isFetchingNextVideoPage
              ? "Loading..."
              : "Load More"}
          </Button>
        </div>
      )}
    </>
  );
}
