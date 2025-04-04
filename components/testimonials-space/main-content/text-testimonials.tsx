"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

export function TextTestimonials({
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
    queryKey: ["testimonials", "space", "text",spaceSlug],
  queryFn: async ({ pageParam = null }) => {
      const res = await fetch(`/api/space/${spaceSlug}/testimonials/text?type=TEXT&cursor=${pageParam || ""}`);
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
      <p>All testimonials</p>
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
