import { useInfiniteQuery } from "@tanstack/react-query";

export function useVideoTestimonials(spaceSlug : string) {
   return  useInfiniteQuery({
    queryKey: ["testimonials", "space", "video",spaceSlug],
    queryFn: async ({ pageParam = null }) => {
      const res = await fetch(`/api/space/${spaceSlug}/testimonials?limit=10&type=VIDEO&cursor=${pageParam || ""}`);
      const data = await res.json();

      return {
        items: data.data.items,
        nextCursor: data.data.nextCursor,
        hasNextPage: data.data.hasNextPage,
      };
    },
    staleTime : 300000,
    initialPageParam: null,
    getNextPageParam: (lastPage: any) => lastPage.nextCursor,
  });
}