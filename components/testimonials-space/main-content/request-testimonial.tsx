import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Copy, Eye } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function RequestTestimonial({ spaceSlug }: { spaceSlug: string }) {
 
    const link = `${process.env.NEXT_PUBLIC_TRUE_HOST}/${spaceSlug}`
  return (
    <div className="flex items-center justify-center pt-10">
      <Card className="bg-inherit border-none flex flex-col justify-center p-6">
        <CardHeader>
          <CardTitle className="text-center flex flex-col gap-1">
            <p className="font-semibold">
              Here is your home to request testimonials
            </p>
            <p className="text-gray-400 text-sm ">
              {" "}
              Share the link, and ask them to help you with a testimonial
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="text-gray-400 flex items-center justify-between">
            <div className="text-lg font-mono">
              {link}
            </div>

            <div className="flex items-center font-mono gap-1">
              <Copy className="size-4 hover:text-blue-700 cursor-pointer" onClick={() => {
                navigator.clipboard.writeText(link).then(() => toast.success("Link copied to clipboard!"))
                .catch(() => toast.error("Failed to copy, try again!"));

              }}/>
              <Eye className="size-4 cursor-pointer hover:text-white" onClick={() => {
                redirect(link);
              
              }}/>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
