"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TestimonialProps } from "@/lib/types";
import { getVideoTestimonialsSchema } from "@/lib/schema";
import { Checkbox } from "../ui/checkbox";
import { submitVideoTestimonial } from "@/app/actions/testimonials.actions";
import { Label } from "../ui/label";

export default function VideoTestimonial({ getFormDetails }: TestimonialProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [ratings, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const videoSchema = getVideoTestimonialsSchema({
    allowStarRatings: getFormDetails?.allowStarRatings as boolean,
    videoLength: getFormDetails?.videoLength as number,
  });

  const form = useForm<z.infer<typeof videoSchema>>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      rating: 5,
      senderName: "",
      senderEmail: "",
      consentDisplay: true,
    },
  });

  const { setValue, watch } = form;
  const rating = watch("rating");

  const { startUpload: startVideoUpload, isUploading: isVideoUploading } =
    useUploadThing("videoUploader", {
      onClientUploadComplete: async (res) => {
        try {
          const videoUrl = res[0].ufsUrl;
          console.log(videoUrl);

          const formData = form.getValues();

          console.log(formData);
          const response = await saveTestimonialToDatabase({
            videoUrl,
            rating: formData.rating as number,
            senderName: formData.senderName,
            senderEmail: formData.senderEmail,
            consentDisplay: formData.consentDisplay,
          });

          if (response.success) {
            toast.success("Testimonial submitted successfully!");
            form.reset();
            setSelectedVideo(null);
            setVideoFile(null);
            setIsDialogOpen(false);
          } else {
            toast.error("Failed to save testimonial data");
          }
        } catch (error) {
          console.error("Error saving testimonial:", error);
          toast.error("Something went wrong. Please try again.");
        }
      },
      onUploadError: (error) => {
        toast.error(`Upload error: ${error.message}`);
      },
    });

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setVideoFile(null);
        setSelectedVideo(null);
        toast.error("File size exceeds limit. Please submit a smaller file.");
        
        return;
      }

      const videoUrl = URL.createObjectURL(file);

      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(videoUrl);

        if (!getFormDetails?.videoLength) {
          toast.error("Internal server error");
          return;
        }
        if (video.duration > getFormDetails?.videoLength) {
          setVideoFile(null);
          setSelectedVideo(null);
          toast.error(
            `Video length exceeds the limit of ${getFormDetails?.videoLength} seconds. Please submit a shorter video.`
          );
  
          return;
        }

        setVideoFile(file);
        setSelectedVideo(videoUrl);
      };

      video.src = videoUrl;
    }
  };

  const onSubmit = async (values: z.infer<typeof videoSchema>) => {
    if (!videoFile) {
      toast.error("Please upload a video");
      return;
    }

    try {
      await startVideoUpload([videoFile]);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload video");
    }
  };

  const handleCancel = () => {
    form.reset();
    setSelectedVideo(null);
    setVideoFile(null);
    setIsDialogOpen(false);
  };

  const saveTestimonialToDatabase = async (
    data: z.infer<typeof videoSchema> & {videoUrl: string}
  ) => {
    try {
      console.log(getFormDetails?.spaceId);
      const newData = { ...data, spaceId: getFormDetails?.spaceId };

      console.log("data in save", newData);
      const videoTestimonial = await submitVideoTestimonial(newData);
      
        return {
          success : videoTestimonial.success,
          message : videoTestimonial.message
        }
      
    } catch (error) {
      console.error("Database save error:", error);
      throw error;
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsDialogOpen(true)}>
          Video testimonial
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-[80vh] rounded-xl overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {!videoFile ? "Choose Your Video" : "Tell Us About Yourself"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {!videoFile
              ? "Upload a video testimonial to share your experience"
              : "Please provide some additional information"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!selectedVideo ? (
              <div className="flex flex-col gap-2">
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoSelect}
                  className="cursor-pointer h-[50px]
                  block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4 file:rounded-md
                  file:border-0 file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 rounded-xl
                  "
                />

                <Label className="text-sm text-gray-500">Note : The maximum video length allowed is {getFormDetails?.videoLength}s</Label>
              </div>
            ) : (
              <div className="my-4">
                <div className="mb-4 flex justify-center">
                  <video
                    controls
                    className="max-w-full rounded-lg max-h-64"
                    src={selectedVideo}
                  />
                </div>
                <div className="text-center text-sm text-gray-500 mb-4">
                  Preview of your video testimonial
                </div>

                <div className="space-y-4">
                  {getFormDetails?.allowStarRatings && (
                    <FormField
                      control={form.control}
                      name="rating"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div
                              className="flex gap-[2px] my-4"
                              onMouseLeave={() =>
                                setHoverRating(rating ? rating : null)
                              }
                            >
                              {Array(5)
                                .fill(0)
                                .map((_, index) => {
                                  return (
                                    <Star
                                      key={index}
                                      className={`w-5 h-4 cursor-pointer transition-all ${
                                        (hoverRating || ratings) > index
                                          ? "fill-yellow-500 text-yellow-500"
                                          : "fill-none text-gray-400"
                                      }`}
                                      onMouseEnter={() =>
                                        setHoverRating(index + 1)
                                      }
                                      onClick={() =>
                                        setValue("rating", index + 1)
                                      }
                                    />
                                  );
                                })}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="senderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="senderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your email address will never be shared publicily.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consentDisplay"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            id="consent-checkbox"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="consent-checkbox"
                          className="text-sm"
                        >
                          I allow use of this testimonial across marketing and
                          various other channels.
                        </FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setVideoFile(null);
                        setSelectedVideo(null);
                      }}
                    >
                      Choose Another Video
                    </Button>

                    <Button type="submit" disabled={isVideoUploading}>
                      {isVideoUploading ? "Uploading..." : "Submit Testimonial"}
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}


