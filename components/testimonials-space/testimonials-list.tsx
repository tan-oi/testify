"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronRight,Menu,X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SpaceSidebar } from "./sidebar";








export function TestimonialsList({ spaceSlug }: { spaceSlug: string }) {
 
 

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials", "space", spaceSlug],
    queryFn: async () => {
      const res = await fetch(`/api/space/${spaceSlug}/testimonials`);
      if (!res.ok) throw new Error("failed to fetch");
      return res.json();
    },
  });

  if (isLoading) return <p>Chill brev</p>;

  console.log(data);
  return (
    <>
      <div className="grid lg:grid-cols-3">
        <div className="rounded-2xl bg-secondary">
            <SpaceSidebar/>
                {/* muted-foreground */}
  
        </div>
        <div className="cols-span-2">

        </div>
        </div>
    </>
  );
}

// cm7yr93dy0004ufvgsl6i418f
//cm7yr7suc0002ufvgmlcjdbp5
