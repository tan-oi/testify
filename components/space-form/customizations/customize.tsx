"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepChange } from "../stepChange";

import { useSpaceModalStore } from "@/lib/store/spaceStore";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createSpace } from "@/app/actions/space.actions";
import { toast } from "sonner";




export function Customize() {
  const { formData,updateFormData } = useSpaceModalStore();
  const allowVideo = formData?.allowVideo || false;

   const customizeSchema = z.object({
    textLength: z.coerce
      .number()
      .int("Text length must be a whole number")
      .positive("Text length must be positive")
      .default(300),
      videoLength: allowVideo
      ? z.coerce.number().int().positive("Video length must be a positive number")
      : z.union([z.number().optional(), z.null()]).optional()
  });

  
  const form = useForm<z.infer<typeof customizeSchema>>({
    resolver: zodResolver(customizeSchema),
    defaultValues: {
      textLength: formData?.textLength || 300,
      videoLength: formData?.videoLength || (allowVideo ? 30 : null)
    }
  });

  const onSubmit = (values : z.infer<typeof customizeSchema>) => {
    console.log(values);
    toast.success("space logged successfully")
    if(!("videoLength" in values))  
    {
      values = {...values, videoLength : null}  
    }
    const finalSpaceDetails = {...formData,...values}

    createSpace(finalSpaceDetails);

    updateFormData(finalSpaceDetails)

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
            <FormField control={form.control}
            name="videoLength"
            render={({field}) =>(
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
          <StepChange />
        </form>
      </Form>
    </>
  );
}
