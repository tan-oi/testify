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
 
  import { useSpaceModalStore } from "@/lib/store/spaceStore";
  import { BasicDetails } from "./space-form/basic/basic-details";

  import { cn } from "@/lib/utils";
  import { ThankYouDetails } from "./space-form/thankyou/thankyou-details";
  import { Customize } from "./space-form/customizations/customize";

  export function GlobalModal() {
    const { isOpen, closeModal,currentStep } =
      useSpaceModalStore();


    const stepperData = [
      {
        stepDetails: {
          number: 0,
          content: "Basic Details",
        },
      },
      {
        stepDetails: {
          number: 1,
          content: "Thank you note",
        },
      },
      {
        stepDetails: {
          number: 2,
          content: "Customizations",
        },
      },
    ];
   
  
    return (
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="w-full max-w-6xl overflow-y-auto h-[80vh] max-h-[90vh]">
          <DialogHeader className="hidden">
            <DialogTitle className=""></DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row">
            {/* <div className="md:basis-2/5">preview</div> */}
            <div
              className="w-full flex flex-col items-center px-4 md:gap-4
      "
            >
              <div className="flex w-full">
                {stepperData.map((items, i) => (
                  <Button
                    key={i}
                    variant={"default"}
                    className={cn(
                      "flex-1 border-r-2 rounded-none",
                      currentStep === items.stepDetails.number
                        ? "bg-muted-foreground text-black hover:bg-white"
                        : "",
                      "first:rounded-l-md last:rounded-r-md last:border-r-0"
                    )}
                    // onClick={() => jumpStep(items.stepDetails.number)}
                  >
                    {items.stepDetails.content}
                  </Button>
                ))}
              </div>

              {currentStep === 0 && <BasicDetails />}
              {currentStep === 1 && <ThankYouDetails/>}
              {currentStep === 2 && <Customize/>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
