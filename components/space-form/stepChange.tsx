"use client";

import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export function StepChange({isLoading = false}) {
  const {  prevStep, currentStep, maxSteps } = useSpaceModalStore();
  return (
    <div className="flex md:justify-between items-center">
      <Button className="" onClick={prevStep} disabled={currentStep == 0}>
        Previous
      </Button>
      {currentStep != maxSteps - 1 ? (
        <Button type="submit" 
        
        >
          Next
        </Button>
      ) : (
       
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (  
                  <Loader2 className="animate-spin size-4 mr-4"/> 
              ) : (
                "Submit"
              )}

            </Button>
      )}
    </div>
  );
}
