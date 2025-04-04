"use client";

import { useVideoTestimonials } from "@/lib/hooks/useVideoTestimonials";

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
      <p>Video testimonials</p>
      {hasNextPage ? `yes ${hasNextPage}` : "no"}
      {console.log(data)}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
