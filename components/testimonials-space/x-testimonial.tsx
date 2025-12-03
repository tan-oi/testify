import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "../ui/card";
import { Testimonials } from "@prisma/client";
import { Heart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useDeleteModal } from "@/lib/store/spaceStore";
import { deleteTestimonial } from "@/app/actions/testimonials.actions";
import { DeleteButton } from "../all-buttons";

export function XCard(
  props: Testimonials & { onDelete?: (id: string) => void }
) {
  const {
    id,
    senderEmail,
    senderName,
    imageUrl,
    content,
    uniqueImportId,
    onDelete,
  } = props;
  const [isLiked, setIsLiked] = useState(false);
  const openDeleteDialog = useDeleteModal((state) => state.openDeleteModal)
  const hasProfileImage =
    Array.isArray(imageUrl) && imageUrl.length > 0 && imageUrl[0];
  const mediaContent = Array.isArray(imageUrl) ? imageUrl.slice(1) : [];

  const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg|mov)$/i);
  const isImage = (url: string) => url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);

  const renderMedia = () => {
    if (mediaContent.length === 0) return null;

    // Single media item
    if (mediaContent.length === 1) {
      const media = mediaContent[0];
      if (isVideo(media)) {
        return (
          <div className="mt-4 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
            <video src={media} controls className="w-full h-auto" />
          </div>
        );
      } else if (isImage(media)) {
        return (
          <div className="mt-4 rounded-xl overflow-hidden border border-black/5 dark:border-white/10">
            <img
              src={media}
              alt="Tweet media"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        );
      }
    }

    if (mediaContent.length > 1) {
      return (
        <div
          className={cn(
            "mt-4 grid gap-0.5 rounded-xl overflow-hidden border border-black/5 dark:border-white/10",
            mediaContent.length === 2
              ? "grid-cols-2"
              : mediaContent.length === 3
              ? "grid-cols-2 grid-rows-2"
              : "grid-cols-2 grid-rows-2"
          )}
        >
          {mediaContent.map((media, index) => {
            // Special layout for 3 images
            const spanClass =
              mediaContent.length === 3 && index === 0 ? "row-span-2" : "";

            if (isVideo(media)) {
              return (
                <div key={index} className={spanClass}>
                  <video
                    src={media}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            } else if (isImage(media)) {
              return (
                <div key={index} className={spanClass}>
                  <img
                    src={media}
                    alt={`Tweet media ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }
  };

  return (
    <Card className="w-full h-full transition-transform duration-300 text-white group">
      <div
        className={cn(
            "w-full h-full p-2 rounded-2xl relative isolate overflow-hidden",
            "bg-white/5 dark:bg-black/90",
            "bg-gradient-to-br from-black/5 to-black/[0.02] dark:from-white/5 dark:to-white/[0.02]",
            "backdrop-blur-xl backdrop-saturate-[180%]",
            "border border-black/10 dark:border-white/10",
            "shadow-[0_8px_16px_rgb(0_0_0_/_0.15)] dark:shadow-[0_8px_16px_rgb(0_0_0_/_0.25)]",
            "will-change-transform translate-z-0"
        )}
      >
        <div
          className={cn(
            "w-full h-full p-5 rounded-xl relative flex flex-col",
            "bg-gradient-to-br from-black/[0.05] to-transparent dark:from-white/[0.08] dark:to-transparent",
            "backdrop-blur-md backdrop-saturate-150",
            "border border-black/[0.05] dark:border-white/[0.08]",
            "text-black/90 dark:text-white",
            "shadow-sm",
            "will-change-transform translate-z-0",
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-black/[0.02] before:to-black/[0.01] dark:before:from-white/[0.03] dark:before:to-white/[0.01] before:opacity-0 before:transition-opacity before:pointer-events-none",
            "hover:before:opacity-100"
          )}
        >
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                {hasProfileImage ? (
                  <img
                    src={imageUrl[0]}
                    alt={senderName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {senderName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-white/90 hover:underline truncate">
                      {senderName}
                    </span>
                  </div>
                  <span className="text-white/60 text-sm truncate">
                    @{senderEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(id);
                      }}
                      className="h-8 w-8 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg p-1 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <Link
                    href={`https://x.com/${senderEmail}/status/${uniqueImportId}`}
                    target="_blank"
                    className="h-8 w-8 shrink-0 text-white/80 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg p-1 flex items-center justify-center transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-white/90 text-base whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>

          {renderMedia()}

          <div className="mt-4 flex items-center justify-between border-t border-black/5 dark:border-white/10 pt-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={cn(
                "flex items-center gap-2 transition-colors rounded-full px-3 py-1.5",
                isLiked
                  ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                  : "text-gray-500 hover:text-red-500 hover:bg-red-500/10"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              <span className="text-sm">Like</span>
            </button>

            <DeleteButton id={id as string}
            name={senderName as string}
            entityType="testimonial"
            labelText="Testimonial"
            type={"Imported"}
            />
           
          </div>
        </div>
      </div>
    </Card>
  );
}
