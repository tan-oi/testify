
"use client";

import { memo } from "react";
import * as Icons from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { contentStore } from "@/lib/store/contentStore";
import { SidebarElementInterface } from "@/lib/types";


export const SidebarElement = memo(function SidebarElement({
  name, viewName, icon
}: SidebarElementInterface) {
  const setCurrentView = contentStore((state) => state.setCurrentView);
  const isActive = contentStore((state) => state.currentView === viewName);
    
  
  const LucideIcon = (Icons as any)[icon];

  if (!LucideIcon) {
    console.error(`Icon "${icon}" not found in lucide-react`);
    return null;
  }
   
  return (
    <Button 
      variant={"ghost"} 
      onClick={() => setCurrentView(viewName)}
      className={cn(
        isActive ? "bg-primary hover:bg-primary/70" : "", 
        "flex justify-start px-2 py-0 gap-2 items-center hover:cursor-pointer text-white"
      )}
    >
      <LucideIcon />
      <p className="text-lg font-medium italic">
        {name}
      </p>
    </Button>
  );
});

