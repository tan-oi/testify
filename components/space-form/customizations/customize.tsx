"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepChange } from "../stepChange";
import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";


export function Customize() {
  const { formData,updateFormData } = useSpaceModalStore();

  const defaultVals = {
    textLength : 300, 
    ...(formData?.allowVideo && {
      videoLength : "30"
    })
  }
  
  const form = useForm({
    defaultValues: defaultVals
  });

  const onSubmit = (values) => {
    console.log(values);
    
    updateFormData(values)
    console.log(formData,"formdata");
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
                <FormLabel>Max character for a testimonial</FormLabel>

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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
               
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
