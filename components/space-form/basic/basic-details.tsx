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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSpaceModalStore } from "@/lib/store/spaceStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepChange } from "../stepChange";
import { Checkbox } from "@/components/ui/checkbox";

const basicDetailsSchema = z.object({
  name: z.string().min(3),
  headerTitle: z
    .string()
    .min(5, {
      message: "we recommend having atleast 5 words as the title",
    })
    .max(50, {
      message:
        "To not overwhelm the user, we recommend not having a very long header",
    }),
  headerDescription: z
    .string()
    .min(5, {
      message: "we recommend having atleast 5 words in description",
    })
    .max(100, {
      message: "keep it short and classy",
    }),
  allowConsent: z.boolean().default(true),
  allowVideo: z.boolean().default(false),
 
});

export function BasicDetails() {
  const { formData, updateFormData, nextStep } = useSpaceModalStore();
  const form = useForm<z.infer<typeof basicDetailsSchema>>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      headerDescription :"",
      headerTitle : "",
      name :"",
      allowVideo : true,
     
      allowConsent : true
    },
  });

  const onSubmit = (data: z.infer<typeof basicDetailsSchema>) => {
    console.log(data);
    // form.reset();
    updateFormData(data);
    nextStep();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="headerTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hwadwe</FormLabel>
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="my-soace" {...field} />
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
              <FormLabel>Description</FormLabel>
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
          name="allowConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Use this testimonial in marketing campaigns
                </FormLabel>
                <FormDescription>
                  You can use the testimonial 
               
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
              <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Allow users to submit videos as testimonial?</FormLabel>
            </FormItem>
          )}
        />

      

        <StepChange />
      </form>
    </Form>
  );
}
