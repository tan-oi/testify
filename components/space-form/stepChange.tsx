"use client";

import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { Button } from "../ui/button";

export function StepChange() {
  const { nextStep, prevStep, currentStep, maxSteps } = useSpaceModalStore();
  return (
    <div className="flex md:justify-between items-center">
      <Button className="" onClick={prevStep} disabled={currentStep == 0}>
        Previous
      </Button>
      {currentStep != maxSteps - 1 ? (
        <Button type="submit" 
        // onClick={nextStep}
        >
          Next
        </Button>
      ) : (
        <Button type="submit">Submit</Button>
      )}
    </div>
  );
}
