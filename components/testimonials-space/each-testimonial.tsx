import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Testimonials } from "@prisma/client";
import { Badge } from "../ui/badge";
import { ChevronDown, ChevronUp, Mail, Star, X } from "lucide-react";
import { Button } from "../ui/button";

import { useEmbedStore } from "@/lib/store/embedStore";

export function EachTestimonial({
  id,
  senderName,
  senderEmail,
  type,
  content = null,
  videoUrl = null,
  rating = null,
  consentDisplay,
  createdAt,
}: Partial<Testimonials>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const openDialog = useEmbedStore((state) => state.openDialog);
  const formatDate = (dateInput: Date | string | null | undefined): string => {
    if (!dateInput) return "";

    try {
      const date =
        typeof dateInput === "string" ? new Date(dateInput) : dateInput;

      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "Invalid date";
      }

      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      const year = date.getFullYear();
      return `${month} ${day}, ${year}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  return (
    <>
      <Card className="w-full bg-secondary flex flex-col h-full">
        <CardHeader className="flex flex-row justify-between p-2 items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-foreground text-lg font-medium tracking-tight">
              {senderName
                ? senderName.charAt(0).toUpperCase() + senderName.slice(1)
                : "Unknown"}
            </h3>
            <div className="flex justify-start text-muted-foreground items-center">
              <Mail className="size-3 mr-1" />
              <span className="text-xs">{senderEmail}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {type && (
              <Badge
                variant={type === "TEXT" ? "outline" : "secondary"}
                className="px-2 py-0 text-xs font-normal rounded-md"
              >
                {type.toLowerCase()}
              </Badge>
            )}

            {consentDisplay ? (
              <Badge
                variant={"outline"}
                className="bg-green-50 text-green-700 border-green-200 px-2 py-0 text-xs font-normal rounded-md"
              >
                Allowed to use
              </Badge>
            ) : (
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 px-2 py-0 text-xs font-normal rounded-md">
                <X className="size-3 mr-1" />
                No consent
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-2 space-y-2 flex-grow">
          {content && (
            <div className="text-accent-foreground">
              <p>{content}</p>
            </div>
          )}

          {videoUrl && (
            <div>
              <video src={videoUrl} controls className="w-full rounded"></video>
            </div>
          )}

          <div className="flex justify-between">
            {rating && (
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star
                    key={i}
                    fill="yellow"
                    className={`w-4 h-4 text-yellow-300`}
                  />
                ))}
              </div>
            )}

            <div className="text-white items-end">
              <span>{createdAt && formatDate(createdAt)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col mt-auto p-2">
          {isExpanded && (
            <div className="flex w-full gap-2 mb-2">
              <Button
                variant={"outline"}
                className="rounded-xl w-fit bg-transparent text-white"
              >
                Delete
              </Button>
              <Button
                className="rounded-xl w-fit bg-transparent text-white"
                onClick={() =>
                  openDialog("single", {
                    id: id,
                    senderEmail: senderEmail,
                    senderName: senderName,
                    createdAt: createdAt,
                    rating,
                    content,
                    videoUrl,
                  })
                }
              >
                Get link
              </Button>
              <Button className="rounded-xl w-fit bg-transparent text-white">
                ok
              </Button>
            </div>
          )}
          <Button
            onClick={() => setIsExpanded((p) => !p)}
            className="w-full mt-auto"
            variant={"default"}
          >
            {!isExpanded ? (
              <div className="flex items-center justify-center w-full gap-1">
                <span>Show more</span>
                <ChevronDown className="size-3" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full gap-1">
                <span>Show less</span>
                <ChevronUp className="size-3" />
              </div>
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
