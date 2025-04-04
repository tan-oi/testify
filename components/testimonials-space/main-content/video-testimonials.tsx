"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export function VideoTestimonials({
  spaceSlug,
  
}: {
  spaceSlug: string;
  
}) {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["testimonials", "space", "video",spaceSlug],
    queryFn: async ({ pageParam = null }) => {
      const res = await fetch(`/api/space/${spaceSlug}/testimonials/text?type=VIDEO&cursor=${pageParam || ""}`);
      const data = await res.json();

      return {
        items: data.data.items,
        nextCursor: data.data.nextCursor,
        hasNextPage: data.data.hasNextPage,
      };
    },
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
  });

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
