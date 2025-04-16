import { Import } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import Form from "next/form";
import { importX } from "@/app/actions/testimonials.actions";
import { Input } from "./ui/input";

export function ImportDialog({
    spaceSlug
} : {spaceSlug : string}) {
    return(
        <div className="flex items-center gap-6 justify-center">
        <Dialog>
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
                    Sure the link is in the format below
                  </span>
                  <span>https://x.com/[account-name]/status/[tweetid]</span>
                </DialogDescription>
              </DialogHeader>
            </div>

            <Form className="space-y-5" action={importX.bind(null,spaceSlug)}>
              <div className="*:not-first:mt-2">
                <div className="relative">
                  <Input
                    id="dialog-subscribe"
                    className="peer ps-9"
                    placeholder="https://x.com/waitin4agi_/status/1911803161326805345"
                    name="link"
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    {/* <MailIcon size={16} aria-hidden="true" /> */}
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Import
              </Button>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

    )
}