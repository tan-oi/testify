"use client"

import { useQuery } from "@tanstack/react-query";

export function AllTestimonials({spaceSlug}: {spaceSlug : string}) {

    const { data, isLoading } = useQuery({
        queryKey: ["testimonials", "space", spaceSlug],
        queryFn: async () => {
          const res = await fetch(`/api/space/${spaceSlug}/testimonials`);
          if (!res.ok) throw new Error("failed to fetch");
          return res.json();
        },
        staleTime:30*10000,
        refetchOnMount : false,
      });

      if(isLoading) return <p>cooking</p>
    return(
            <>
                <p>All testimonials</p>
                {
                    JSON.stringify(data)
                }
            </>
    )
}