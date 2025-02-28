// "use client"

// import { useSpaceModalStore } from "@/lib/store/spaceStore";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

// export function GlobalModal() {
//     const {isOpen,closeModal,type} = useSpaceModalStore();

//     return (
//         <Dialog open={isOpen} onOpenChange={closeModal}>
//         <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-auto">
//           <DialogHeader>
//             <DialogTitle>Global Dialog {type}</DialogTitle>
//           </DialogHeader>
//           <p>Workig</p>
//         </DialogContent>
//       </Dialog>
//     )
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { BasicDetails } from "./space-form/basic/basic-details";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function GlobalModal() {
  const { isOpen, type, formData, updateFormData, closeModal } =
    useSpaceModalStore();

  const [steps, setSteps] = useState(1);

  
  const stepperData = [
    {
        stepDetails : {
            "number" : 1,
            "content" : "Basic Details"
        }
        
    },
    {
        stepDetails : {
            "number" : 2,
            "content" : "Thank you note"
        }
        
    },{
        stepDetails : {
            "number" : 3,
            "content" : "Customizations"
        }
        
    }
  ]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    updateFormData({ [name]: type === "checkbox" ? checked : value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="w-full max-w-6xl overflow-y-auto max-h-[90vh]">
        <DialogHeader className="hidden">
          <DialogTitle className=""></DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row">
          <div className="md:basis-2/5">preview</div>
          <div
            className="md:basis-3/5 flex flex-col items-center px-4 md:gap-4
    "
          >
            <div className="flex w-full">
             
                {stepperData.map((items) => (
                   <Button variant={"default"} className={cn("flex-1 border-r-2 rounded-none",
                    steps === items.stepDetails.number ? "bg-muted-foreground text-black hover:bg-white" :"", "first:rounded-l-md last:rounded-r-md last:border-r-0",

                 

                   )} onClick={() => setSteps(items.stepDetails.number)}>
                        {items.stepDetails.content}
                    
                   </Button>
                ))}
            </div>
            <BasicDetails />
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
