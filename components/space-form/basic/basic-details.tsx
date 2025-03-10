"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { Input } from "@/components/ui/input";

import { StepChange } from "../stepChange";

import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { basicDetailsSchema } from "@/lib/schema";
import { useEffect } from "react";

export function BasicDetails() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session || !session?.user) {
      router.push("/auth");
    }
  }, [session, router]);

  const { formData, type, updateFormData, nextStep } = useSpaceModalStore();

  const form = useForm<z.infer<typeof basicDetailsSchema>>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: formData || {
      headerDescription: "",
      headerTitle: "",
      name: "",
      allowVideo: true,
      askConsent: true,
      allowStarRatings: true,
    },
  });

  const onSubmit = (data: z.infer<typeof basicDetailsSchema>) => {
    console.log(data);
    updateFormData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <div className="md:mt-2">
        <h1 className="md:text-3xl font-bold">
          {type === "create" ? "Create a new space" : "Edit a space"}
        </h1>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="myspace"
                  {...field}
                  disabled={type === "edit"}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headerTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Header Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="hey, hope you're having a blast with our product"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headerDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your custom messsage</FormLabel>
              <FormControl>
                <Input
                  placeholder="please make sure you give apt details regarding what this form is for"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="askConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Ask for consent</FormLabel>
                <FormDescription>
                  We recommend taking users permission, it is better to use a
                  testimonial after getting a consent
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowVideo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                Allow users to submit videos as testimonial?
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allowStarRatings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>
                Allow users to rate your [service/product] out of 5 stars?
              </FormLabel>
            </FormItem>
          )}
        />

        <StepChange />
      </form>
    </Form>
  );
}
