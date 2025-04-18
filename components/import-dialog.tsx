// "use client";

import { Import } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { importX } from "@/app/actions/testimonials.actions";
import { toast } from "sonner";

export function ImportDialog({
    spaceSlug
} : {spaceSlug : string}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, isLoading] = useState(false);
    async function handleSubmit(formData: FormData) {
      isLoading(true);
        const link = formData.get("link") as string;
        console.log(typeof link);
        
        if(!link)
        {
          toast.error("Enter a link dawg!") 
          return;
        }
       const res = await importX({
        link,
        spaceSlug
       });
        
       if(res.success) {
        toast.success(res.message);
       }
       else toast.error(res.error)

       setIsOpen(false);
       isLoading(false);
        
    }

    return(
        <div className="flex items-center gap-6 justify-center">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Import from X</Button>
          </DialogTrigger>
          <DialogContent className="w-[450px]">
            <div className="mb-2 flex flex-col items-center gap-2">
              <div
                className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <Import />
              </div>
              <DialogHeader>
                <DialogTitle className="sm:text-center">
                  Paste the link below
                </DialogTitle>
                <DialogDescription className="flex flex-col">
                  <span className="text-center">
                    Make sure the link is in the format below
                  </span>
                  <span>https://x.com/[account-name]/status/[tweetid]</span>
                </DialogDescription>
              </DialogHeader>
            </div>

            <form className="space-y-5" action={handleSubmit}>
              <div className="*:not-first:mt-2">
                <div className="relative">
                  <Input
                    id="dialog-subscribe"
                    className="peer ps-9"
                    placeholder="https://x.com/waitin4agi_/status/1911803161326805345"
                    name="link"
                    required
                    type="text"
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    {/* Icon placeholder */}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {loading ? "Importing...." : "Import"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
}