"use client";

import { useTextTestimonials } from "@/lib/hooks/useTextTestimonial";

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
      <p>Text testimonials</p>
      {hasNextPage ? `yes ${hasNextPage}` : "no"}
      {console.log(data)}

    <div className="flex gap-4" >


   
    
    </div>

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
