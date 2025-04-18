"use client"

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

async function fetchImportedTestimonials() {
    const res = await fetch("/api/import");

   if(!res.ok) toast.error("failed to fetch, refresh!");

   const {res: items} = await res.json();
   return items;
}

export function ImportedTestimonials({
    spaceSlug
} : {
    spaceSlug : string
}) {
    
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
      } = useQuery({
        queryKey: ["testimonials", "imported",spaceSlug],
        queryFn: fetchImportedTestimonials,
        staleTime: 1000 * 60 * 5, // 5m
        retry: 1,
      });
      if(isLoading) return <p>
            Loading
      </p>
    return (
   
        <p>
           {
            JSON.stringify(data)
           }
        </p>
    )   
}