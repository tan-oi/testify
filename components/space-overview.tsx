"use client"

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

export function SpaceOverview() {
  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-foreground font-semibold">Spaces</h2>

          <Button className=""> Create a new space </Button>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
            className="pl-10"
            placeholder="Search spaces by name..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <Card className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible">
            <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-foreground text-xl">UNO</h1>
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
                    <DropdownMenuContent align="end" className="z-50" avoidCollisions={false}>
                      <DropdownMenuItem>Manage testimonials</DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Video: 5</p>
                  <p className="text-muted-foreground">Text: 10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible">
            <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-foreground text-xl">UNO</h1>
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
                    <DropdownMenuContent align="end" className="z-50" avoidCollisions={false}>
                      <DropdownMenuItem onSelect={() => console.log("heelo")}>
                      

                        Option 1
                       
                        </DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Video: 5</p>
                  <p className="text-muted-foreground">Text: 10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible">
            <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-foreground text-xl">UNO</h1>
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
                    <DropdownMenuContent align="end" className="z-50" avoidCollisions={false}>
                      <DropdownMenuItem onSelect={() => console.log("heelo")}>
                      

                        Option 1
                       
                        </DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Video: 5</p>
                  <p className="text-muted-foreground">Text: 10</p>
                </div>
              </div>
            </CardContent>
          </Card>


          <Card className="w-full h-[120px] md:h-[120px] border-muted border bg-secondary relative overflow-visible">
            <CardContent className="pt-2 md:pt-4 flex items-center justify-between">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold text-foreground text-xl">UNO</h1>
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
                    <DropdownMenuContent align="end" className="z-50 p-4" avoidCollisions>
                      <DropdownMenuItem onSelect={() => console.log("heelo")}>
                      

                        Option 1
                       
                        </DropdownMenuItem>
                      <DropdownMenuItem>Option 2</DropdownMenuItem>
                      <DropdownMenuItem>Option 3</DropdownMenuItem>
                      <DropdownMenuItem>Option 4</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Video: 5</p>
                  <p className="text-muted-foreground">Text: 10</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </>
  );
}
