"use client";

interface SpaceOverViewDataInterface {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  textTestimonials: number;
  videoTestimonials: number;
}

import { DiscAlbum, Ellipsis, Search } from "lucide-react";
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
import { QueryClient, useQuery } from "@tanstack/react-query";
import Link from "next/link";

export function SpaceOverview() {
  const { openModal, formData } = useSpaceModalStore();
  const { data, isLoading } = useQuery({
    queryKey: ["space", "overview"],
    queryFn: async () => {
      const res = await fetch("/api/space/overview");
      if (!res.ok) throw new Error("failed to fetch");
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading currently</p>;

  const spaceOverViewData: SpaceOverViewDataInterface[] = data.data;
  console.log(spaceOverViewData);
  return (
    <>
      <Button onClick={() => console.log(formData)}>
        getting the for data
      </Button>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-foreground font-semibold">Spaces</h2>

          <Button className="" onClick={() => openModal("create")}>
            {" "}
            Create a new space{" "}
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input className="pl-10" placeholder="Search spaces by name..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          {spaceOverViewData.map((items) => (
            
              <Card key={items.id}
              className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible">
                <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
                  <div className="flex flex-col space-y-3 w-full">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-foreground text-xl">
                        {items.name}
                      </h1>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full shadow-none"
                            aria-label="Open edit menu"
                          >
                            <Ellipsis size={16} aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="z-50 p-2"
                          avoidCollisions
                        >
                          <Link href={`/spaces/${items.slug}`}>
                          <DropdownMenuItem
                            
                            >
                            Manage Testimonials
                          </DropdownMenuItem>
                            </Link>
                          <DropdownMenuItem>Get link</DropdownMenuItem>
                          <DropdownMenuItem className=" ">Delete Space</DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => {
                              // openModal("edit",{
                              //   items
                              // })
                            }}
                          >Edit Space</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="text-muted-foreground">
                        Video : {items.videoTestimonials}
                      </p>
                      <p className="text-muted-foreground">
                        Text: {items.textTestimonials}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          
          ))}
        </div>
      </div>
    </>
  );
}
