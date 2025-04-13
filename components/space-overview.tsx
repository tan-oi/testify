"use client";
import { Search, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { useDeleteModal, useSpaceModalStore } from "@/lib/store/spaceStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getDetailsQueryKey } from "@/lib/utils";
import { SpaceOverViewDataInterface, CachedSpaceData } from "@/lib/types";
import { toast } from "sonner";
import { deleteSpace } from "@/app/actions/space.actions";


export function SpaceOverview() {
  const { openModal } = useSpaceModalStore();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const  openDeleteModal  = useDeleteModal(state => state.openDeleteModal);
  const isOpen = useDeleteModal(state=> state.isOpen)


  const { data, isLoading } = useQuery({
    queryKey: ["space", "overview"],
    queryFn: async () => {
      const res = await fetch("/api/space/overview");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime : 300*1000,
    refetchInterval : 300*1000,
    refetchOnMount : true
  });

  if (isLoading) return <p>Loading spaces...</p>;

  const spaceOverViewData: SpaceOverViewDataInterface[] = data.data;
  
  const filteredSpaces = spaceOverViewData.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = (value : string) => {
    console.log(value);
    navigator.clipboard.writeText(value).then(() => {
      toast.info("link copied to clipboard");
    })
    .catch(() => toast.error("failed, try again"))
  }

  const handleEditClick = (slug: string) => {
    const queryKey = getDetailsQueryKey(slug);

    const cachedData = queryClient.getQueryData<CachedSpaceData>(queryKey);

    const data = {
      name: cachedData?.data?.spaceData?.name,
      ...cachedData?.data?.spaceData?.spaceCustomization,
    };

    if (cachedData) {
      openModal("edit", data, false);
    } else {
      queryClient
        .fetchQuery({
          queryKey,
          queryFn: async () => {
            const response = await fetch(`/api/space/${slug}/details`);
            if (!response.ok) {
              throw new Error("Failed to fetch space details");
            }
            return response.json();
          },
          staleTime: Infinity,
          gcTime : 1000*60
          
        })
        .then((result) => {
          openModal("edit", result.data.spaceData.spaceCustomization, false);
        });
    }
  };

  const prefetchSpaceData = (slug: string) => {
    const queryKey = getDetailsQueryKey(slug);
   
    if (queryClient.getQueryData(queryKey)) {
      console.log("Already in cache:", slug);

      return;
    }

    console.log("Prefetching data for slug:", slug);
    queryClient.prefetchQuery({
      queryKey,
      queryFn: async () => {
        const response = await fetch(`/api/space/${slug}/details`);
        if (!response.ok) {
          throw new Error("Failed to fetch space details");
        }
        const data = await response.json();
        return data;
      },
      staleTime: Infinity,
      gcTime: 1000 * 60,
    });
  };

  
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground font-semibold">Spaces</h2>
        <Button onClick={() => openModal("create", null, true)}>
          Create a new space
        </Button>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search spaces by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {filteredSpaces.map((item) => (
          <Card
            key={item.id}
            className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible"
          >
            <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <Link href={`/spaces/${item.slug}`}>
                  <h1 className="font-semibold text-foreground text-xl">
                    {item.name}
                  </h1>
                  </Link>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full shadow-none"
                        aria-label="Open edit menu"
                        onClick={() => prefetchSpaceData(item.slug)}
                      >
                        <Ellipsis size={16} aria-hidden="true" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="z-50 p-2"
                      avoidCollisions
                    >
                      <Link href={`/spaces/${item.slug}`}>
                        <DropdownMenuItem>Manage Testimonials</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem
                         onSelect={() => {
                          copyToClipboard(`${process.env.NEXT_PUBLIC_TRUE_HOST}/${item.slug}`)
                        }}
                      >Get link</DropdownMenuItem>
                    
                      <DropdownMenuItem
                      onClick={
                        (e) => 
                        {
                        e.preventDefault();
                        openDeleteModal(
                          {
                          name : item.name,
                          id : item.id
                        }, deleteSpace,
                        {
                          entityType : "space",
                          labelText : "Delete space"
                        })
                    }
                  
                  }
                      >
                        Delete Space
                        </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={(e) => {
                          e.preventDefault();
                          handleEditClick(item.slug);
                        }}
                      >
                        Edit Space
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Video: {item.videoTestimonials}
                  </p>
                  <p className="text-muted-foreground">
                    Text: {item.textTestimonials}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
       
        ))}
      </div>
    </div>
  );
}



