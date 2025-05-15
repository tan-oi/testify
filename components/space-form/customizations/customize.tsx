"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepChange } from "../stepChange";

import { useSpaceModalStore } from "@/lib/store/spaceStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSpace, editSpace } from "@/app/actions/space.actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { getDetailsQueryKey } from "@/lib/utils";

export function Customize() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  if (!session || !session?.user) router.push("/auth");
  const { formData, updateFormData, closeModal, type } = useSpaceModalStore();
 
  const allowVideo = formData?.allowVideo || false;
  const [isLoading, setIsLoading] = useState(false);

  const customizeSchema = z.object({
    textLength: z.coerce
      .number()
      .int("Text length must be a whole number")
      .positive("Text length must be positive")
      .default(300),
    videoLength: allowVideo
      ? z.coerce
          .number()
          .int()
          .positive("Video length must be a positive number")
      : z.union([z.number().optional(), z.null()]).optional(),
  });

  const form = useForm<z.infer<typeof customizeSchema>>({
    resolver: zodResolver(customizeSchema),
    defaultValues: {
      textLength: formData?.textLength || 300,
      videoLength: formData?.videoLength || (allowVideo ? 30 : null),
    },
  });

  const onSubmit = async (values: z.infer<typeof customizeSchema>) => {
    try {
      setIsLoading(true);
      const submittedValues = {
        ...values,
        videoLength: formData?.allowVideo ? values.videoLength : null,
      };

      const finalSpaceDetails = { ...formData, ...submittedValues };

      updateFormData(finalSpaceDetails);

      if (type === "edit") {
        const result = await editSpace(finalSpaceDetails);
        if (result?.success) {
          toast.success(result.message || "Space editted successfully");

          const queryKey = getDetailsQueryKey(result?.slug?.slug ?? "");

          queryClient.invalidateQueries({
            queryKey,
          });
          queryClient.removeQueries({ queryKey });

          queryClient.invalidateQueries({
            queryKey: ["space", "overview"],
          });

          //@ts-expect-error there is no other way
          updateFormData(null);
          closeModal();
        } else {
          toast.error("Failed to create a space, please try again");

          if (result?.issues) {
            Object.entries(result.issues).forEach(([field, error]) => {
              if (field in form.formState.errors) {
                form.setError(field as any, {
                  type: "server",
                  message: Array.isArray(error) ? error[0] : error.toString(),
                });
              }
            });
          }
        }
      } else {
        const result = await createSpace(finalSpaceDetails);

        if (result?.success) {
          toast.success(
            result.message ||
              "Space creation success, your dashboard would update within a few seconds"
          );
          router.push(`/spaces/${result.spaceSlug}`);

          queryClient.invalidateQueries({
            queryKey: ["space", "overview"],
          });
          //@ts-expect-error there is no other way
          updateFormData(null);
          closeModal();
        } else {
          toast.error("Failed to create a space, please try again");

          if (result?.issues) {
            Object.entries(result.issues).forEach(([field, error]) => {
              if (field in form.formState.errors) {
                form.setError(field as any, {
                  type: "server",
                  message: Array.isArray(error) ? error[0] : error.toString(),
                });
              }
            });
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="md:mt-2">
          <h1>customize</h1>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="textLength"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max length of text testimonial</FormLabel>

                <FormControl>
                  <Input placeholder="300" {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {formData?.allowVideo && (
            <FormField
              control={form.control}
              name="videoLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max length of a video testimonial</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select video length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="45">45 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          )}
          <StepChange isLoading={isLoading} />
        </form>
      </Form>
    </>
  );
}
