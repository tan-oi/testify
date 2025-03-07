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
import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

interface SpaceOverViewDataInterface {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  textTestimonials: number;
  videoTestimonials: number;
}

interface CachedSpaceData {
  spaceSlug: string;
  data: {
    spaceData: {
      spaceCustomization: {
        id: string;
        spaceId: string;
        spaceHeader: string;
        spaceCustomMessage: string;
        spaceVideosAllowed: boolean;
        spaceStarRatings: boolean;
        spaceThankYouHeader: string;
        spaceThankYouDescription: string;
        spaceAskConsent: boolean;
        textLengthAllowed: number;
        videoLengthAllowed: number;
        shareAllowed: boolean;
      };
      name: string;
    };
  };
}



export function SpaceOverview() {
  const { openModal } = useSpaceModalStore();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["space", "overview"],
    queryFn: async () => {
      const res = await fetch("/api/space/overview");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (isLoading) return <p>Loading spaces...</p>;

  const spaceOverViewData: SpaceOverViewDataInterface[] = data.data;
  const filteredSpaces = spaceOverViewData.filter((space) =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDetailsQueryKey = (slug: string) => ["space", "details", slug];

  const handleEditClick = (slug: string) => {
    const queryKey = getDetailsQueryKey(slug);

    const cachedData = queryClient.getQueryData<CachedSpaceData>(queryKey);
    console.log(
      "Cached data: found",
      
    );


    /* 
      {
    "spaceSlug": "tanay",
    "data": {
        "spaceData": {
            "spaceCustomization": {
                "id": "5d63bf88-3358-4c08-a11b-43c0680c41be",
                "spaceId": "cm7tl3p530001ufe013nxxonl",
                "spaceHeader": "hey, hope you're having a blast with our product.",
                "spaceCustomMessage": "please make sure you add a few details as to how our product has been helping you, thansks.",
                "spaceVideosAllowed": true,
                "spaceStarRatings": true,
                "spaceThankYouHeader": "thank you so much",
                "spaceThankYouDescription": "means a lot, thanks a ton!",
                "spaceAskConsent": true,
                "textLengthAllowed": 300,
                "videoLengthAllowed": 30,
                "shareAllowed": true
            },
            "name": "tanay"
        }
    }
}
    */


    const data = {spaceName : cachedData?.spaceSlug, ...cachedData?.data?.spaceData?.spaceCustomization}

    console.log("updated data",data);
  
    if (cachedData) {
      openModal("edit", data);
    } else {
      queryClient
        .fetchQuery({
          queryKey,
          queryFn: async () => {
            console.log("Fetching data for slug:", slug);
            const response = await fetch(`/api/space/${slug}/details`);
            if (!response.ok) {
              throw new Error("Failed to fetch space details");
            }
            return response.json();
          },
          staleTime: Infinity,
          gcTime: Infinity,
        })
        .then((result) => {
          openModal("edit", result.data.spaceData.spaceCustomization);
        });
    }
  };

  const prefetchSpaceData = (slug: string) => {
    // if (prefetchedSlugs.has(slug)) {
    //   console.log("Already prefetched:", slug);
    //   return;
    // }

    const queryKey = getDetailsQueryKey(slug);

    if (queryClient.getQueryData(queryKey)) {
      console.log("Already in cache:", slug);
      // setPrefetchedSlugs(prev => new Set(prev).add(slug));
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
      gcTime: Infinity,
    });
    // .then(() => {
    //   setPrefetchedSlugs(prev => new Set(prev).add(slug));
    // });
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground font-semibold">Spaces</h2>
        <Button onClick={() => openModal("create")}>Create a new space</Button>
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
                  <h1 className="font-semibold text-foreground text-xl">
                    {item.name}
                  </h1>
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
                      <DropdownMenuItem>Get link</DropdownMenuItem>
                      <DropdownMenuItem>Delete Space</DropdownMenuItem>
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
