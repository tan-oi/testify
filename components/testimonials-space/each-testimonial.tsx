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
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Link2,
  Mail,
  Star,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

import { useEmbedStore } from "@/lib/store/embedStore";
import { useLikeTestimonial } from "@/lib/hooks/useLikeTestimonial";
import { useDeleteModal } from "@/lib/store/spaceStore";
import { deleteTestimonial } from "@/app/actions/testimonials.actions";
import { DeleteButton } from "../all-buttons";

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
  isLiked,
  spaceSlug,
}: Partial<Testimonials> & { spaceSlug?: string }) {
  const likeTestimonial = useLikeTestimonial(spaceSlug as string);
  const handleLike = () => {
    likeTestimonial.mutate({
      id: id as string,
      isLiked: !isLiked,
      type: type as string,
    });
  };



  const openDialog = useEmbedStore((state) => state.openDialog);
  const openDeleteDialog = useDeleteModal((state) => state.openDeleteModal)
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
      <Card className="w-full bg-secondary flex flex-col h-full ">
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
          <div className="w-3/4 border-t border-black/5 dark:border-white/10 pt-3" />
                   {/* need to make sure we prevent any direct like invocation in the api + add rate limiting */}
          <div className="flex w-full gap-2 mb-2">
            {consentDisplay && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 transition-colors rounded-full ${
                    isLiked
                    ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                  }`}
                  onClick={handleLike}
                  disabled={likeTestimonial.isPending}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`}
                  />
                  <span className="text-sm">Like</span>
                </Button>
              </div>
            )}
            {/* <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-full w-fit bg-transparent text-white"
              onClick={() => openDeleteDialog({
                id : id!,
                name : senderName!
              },deleteTestimonial,{
                entityType : "testimonial",
                labelText : "Testimonial",
                type : type as string
              })}
            >
              <Trash2 className="w-4 h-4"/>
              <span>Delete</span>
            </Button> */}
            <DeleteButton id={id as string}
            name={senderName as string}
            entityType="testimonial"
            labelText="Testimonial"
            type={type as string}
            />
            <Button
              className="rounded-full w-fit bg-transparent text-white border"
              variant={"default"}
              size={"sm"}
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
              <Link2 className="w-4 h-4"/>
              <span>Link</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
