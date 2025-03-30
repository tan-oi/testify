"use client";
import { Star, Asterisk, Loader2 } from "lucide-react";
import { useState,useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getTextTestimonialsSchema } from "@/lib/schema";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

import { submitTextTestimonial } from "@/app/actions/testimonials.actions";

import { toast } from "sonner";
import { TestimonialProps } from "@/lib/types";
import { Label } from "../ui/label";
export default function TextTestimonial({
  getFormDetails,
}: TestimonialProps) {
  const [ratings, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [openMain, setOpenMain] = useState(false);
  const [openThankYou, setThankYou] = useState(false);
  const [isPending, startTransition] = useTransition()


  const textSchema = getTextTestimonialsSchema({
    contentLength: getFormDetails?.textLength as number,
    allowStarRatings: getFormDetails?.allowStarRatings as boolean,
  });
  const form = useForm<z.infer<typeof textSchema>>({
    resolver: zodResolver(textSchema),
    defaultValues: {
      senderEmail: "",
      senderName: "",
      content: "",
      consentGiven: true,
      rating: 5,
    },
  });

  const { setValue, watch } = form;
  const rating = watch("rating");

  async function onSubmit(values: z.infer<typeof textSchema>) {
    startTransition(async () => {
      const res = await submitTextTestimonial({
        ...values,
        contentLength: getFormDetails?.textLength as number,
        allowStarRatings: getFormDetails?.allowStarRatings as boolean,
        spaceId: getFormDetails?.spaceId as string,
      });
      
      if(res.success) {

        toast.success(res.message);
        form.reset();

        setTimeout(() => {
          setOpenMain(false);
          setThankYou(true);
        },2000)
      }
      
      else {
        toast.error(res.message);
        console.log(res.error);
      }
      
    })
    }

  return (
    <>
   
    <Dialog open={openMain} onOpenChange={setOpenMain}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full" >Text</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            Write text testimonial
          </DialogTitle>

          <div className="flex flex-col gap-1">
            <p>QUESTIONS</p>
            <div>
              <p>uno</p>
              <p>duas</p>
              <p>tres</p>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                onMouseEnter={() => setHoverRating(index + 1)}
                                onClick={() => setValue("rating", index + 1)}
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience"
                      className="resize-none h-[80px]"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="relative w-fit">
                    <div className="flex items-center gap-[2px] w-full">
                      <Label>Your Name</Label>
                        <Asterisk className="size-3 absolute -top-1 left-16 fill-red-600 text-red-600" />
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  <FormLabel className="relative flex items-center text-sm">
                    Your Email
                    <Asterisk className="size-3 absolute -top-1 left-16 fill-red-500 text-red-500" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@gmail.com"
                      type="email"
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
              name="consentGiven"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      id="consent-checkbox"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="consent-checkbox" className="text-sm">
                    I allow use of this testimonial across marketing and various
                    other channels.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isPending}>
                  
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" variant={"default"} disabled={isPending} className="flex items-center">
                {isPending ? <Loader2 className="animate-spin"/> : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>



<Dialog open={openThankYou} onOpenChange={setThankYou}>
<DialogContent>
  <h3>Thank You!</h3>
  <p>Your testimonial has been submitted.</p>

  <img
    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjlmcDZyMXJxNGl2Z2hlcmthNTQ2NWlyYjdsZmYwd2NwaWJ3dmZqeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5GoVLqeAOo6PK/giphy.gif"
    alt="Success GIF"
    className="w-full mx-auto mt-4 rounded-md"
  />

  <DialogFooter>
    
  <Button
    variant="default"
    onClick={() => setThankYou(false)}
    className="mt-4"
  >
    Close
  </Button>
  </DialogFooter>
</DialogContent>
</Dialog>
</>
  );
}
