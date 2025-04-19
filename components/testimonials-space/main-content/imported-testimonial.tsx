"use client"

import { useQuery } from "@tanstack/react-query";

import { XCard } from "../x-testimonial";
import { Testimonials } from "@prisma/client";
import { Loader2 } from "lucide-react";

async function fetchImportedTestimonials() {
  const res = await fetch("/api/import");

  if (!res.ok) {
    throw new Error("Failed to fetch testimonials");
  }

  const { res: items } = await res.json();
  return items;
}

export function ImportedTestimonials({ spaceSlug }: { spaceSlug: string }) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["testimonials", "space", "imported", spaceSlug],
    queryFn: fetchImportedTestimonials,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading testimonials...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-red-500 mb-4">Failed to load testimonials</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-gray-500 mb-2">No testimonials yet</p>
        <p className="text-gray-400 text-sm">Import some testimonials to get started</p>
      </div>
    );
  }

  return (
    <div className="my-4 grid grid-cols-1 sm:grid-cols-2  gap-4 auto-rows-fr">
      {data.map((item: Testimonials, i: number) => (
        <XCard key={item.id} {...item} />
      ))}
    </div>
  );
}